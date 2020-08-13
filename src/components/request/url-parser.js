import {concatUrls} from '@/util';

const WHILE = true, EMPTY_ARR = [];

function pushArg(args, placeholder, prop, value = null) {
  const arg = {placeholder, prop, value, preParsed: true};
  args.push(arg);
  return arg;
}

function doParseQueryArgs(query, paramsArgs, prefix) {
  if (query) {
    const searchArgs = [];
    const params = query.split('&'), {length} = params;
    for (let i = 0; i < length; i++) {
      const originArg = params[i];
      const [name, argVal] = originArg.split('=');
      let placeholder = '{}', value;
      if (argVal) {
        if (argVal.length > 2) {
          const isMaybe = `{${argVal.slice(1, -1)}}` === argVal;
          placeholder = isMaybe ? argVal : `{${argVal}}`;
          const [ig, val] = placeholder.slice(1, -1).trim().split(':');
          value = isMaybe ? (val ? val.trim() : null) : argVal;
        } else {
          placeholder = `{${argVal}}`;
          value = argVal;
        }
      }
      const thisArg = pushArg(searchArgs, placeholder, name, value);
      thisArg.origin = `${name}=${placeholder}`;
    }
    paramsArgs[keyQuery(prefix)] = searchArgs;
  }
}

function parseCurlyPlaceholder(thisArgs, path, openIdx, closeIdx) {
  const placeholder = path.slice(openIdx, closeIdx + 1);
  const [prop, value] = placeholder.slice(1, -1).trim().split(':');
  pushArg(thisArgs, placeholder, prop.trim(), value ? value.trim() : null);
  return closeIdx + 1;
}

function parseSlashPlaceholder(thisArgs, path, slashColonIdx) {
  const backslashIdx = path.indexOf('/', slashColonIdx + 1);
  const lastIdx = backslashIdx < 0 ? Infinity : backslashIdx;
  const placeholder = path.slice(slashColonIdx + 1, lastIdx);
  const prop = placeholder.slice(1);
  pushArg(thisArgs, placeholder, prop);
  return lastIdx + 1;
}

function doParsePath(path, params, prefix) {
  let start = 0, thisArgs = [];
  do {
    const slashColonIdx = path.indexOf('/:', start);
    if (slashColonIdx < 0) {
      const openIdx = path.indexOf('{', start);
      if (openIdx < 0) {
        break;
      } else {
        const closeIdx = path.indexOf('}', openIdx);
        if (closeIdx < 0) {
          break;
        } else {
          start = parseCurlyPlaceholder(thisArgs, path, openIdx, closeIdx);
        }
      }
    } else {
      const openIdx = path.indexOf('{', start);
      if (openIdx < 0) {
        start = parseSlashPlaceholder(thisArgs, path, slashColonIdx);
      } else {
        if (openIdx > slashColonIdx) {
          start = parseSlashPlaceholder(thisArgs, path, slashColonIdx);
        } else {
          const closeIdx = path.indexOf('}', openIdx);
          if (closeIdx > 0) {
            start = parseCurlyPlaceholder(thisArgs, path, openIdx, closeIdx);
          } else {
            start = parseSlashPlaceholder(thisArgs, path, slashColonIdx);
          }
        }
      }
    }
  } while (WHILE);
  params[keyPath(prefix)] = thisArgs;
}

function keyPath(prefix) {
  return prefix + 'Path';
}

function keyQuery(prefix) {
  return prefix + 'Query';
}

function doParseSlicedUrl(url, params, urls, prefix) {
  if (url) {
    const [path, query] = url.split('?');
    urls[keyPath(prefix)] = path;
    urls[keyQuery(prefix)] = query;
    doParsePath(path, params, prefix);
    doParseQueryArgs(query, params, prefix);
  }
}

export function parseUrl(originUrl, baseURL, namespace) {
  const formattedUrl = concatUrls.call(true, baseURL, namespace, originUrl);
  const [href, hash] = formattedUrl.split('#'), resultUrl = {}, params = {};
  doParseSlicedUrl(href, params, resultUrl, 'href');
  doParseSlicedUrl(hash, params, resultUrl, 'hash');
  return {params, urls: resultUrl};
}

function formatPath(path, params) {
  if (!path) {
    return '';
  }
  const thisArgs = params || EMPTY_ARR, {length} = thisArgs;
  for (let i = 0; i < length; i++) {
    const {placeholder, value} = thisArgs[i];
    if (value) {
      path = path.replace(placeholder, value);
    }
  }
  return path;
}

function formatQuery(params) {
  const thisArgs = params || EMPTY_ARR;
  const {length} = thisArgs, result = [];
  for (let i = 0; i < length; i++) {
    const {origin, placeholder, value} = thisArgs[i];
    result.push(origin.replace(placeholder, value || ''));
  }
  return result.join('&');
}

function joinOn(path, query, char) {
  return (path && query) ? `${path}${char}${query}` : path;
}

export function formatUrl(urls, params) {
  const hrefPath = formatPath(urls.hrefPath, params.hrefPath);
  const hrefQuery = formatQuery(params.hrefQuery);
  const href = joinOn(hrefPath, hrefQuery, '?');
  const hashPath = formatPath(urls.hashPath, params.hashPath);
  const hashQuery = formatQuery(params.hashQuery);
  return joinOn(href, joinOn(hashPath, hashQuery, '?'), '#');
}