import {concatUrls} from '@/util';

const WHILE = true, EMPTY_ARR = [];

export function newRequestArg(placeholder = null, prop = null, value = null) {
  return {
    placeholder, prop, value,
    // 用来标记删除前的动画
    available: true,
    // 标记当前参数是否启用
    enable: true,
  };
}

function pushArg(args, placeholder, prop, value = null) {
  const arg = newRequestArg(placeholder, prop, value);
  // 用来标记该参数是预解析参数还是自定义参数，预解析参数不可修改参数名
  arg.preParsed = true;
  args.push(arg);
  return arg;
}

function doParseQueryArgs(query, paramsArgs, prefix) {
  const searchArgs = [];
  paramsArgs[keyQuery(prefix)] = searchArgs;
  if (query) {
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
      // const origin = `${name}=${placeholder}`;
      pushArg(searchArgs, placeholder, name, value);
    }
  }
}

function parseCurlyPlaceholder(thisArgs, path, openIdx, closeIdx) {
  const placeholder = path.slice(openIdx, closeIdx + 1);
  const [prop, value] = placeholder.slice(1, -1).trim().split(':');
  pushArg(thisArgs, placeholder, prop.trim(), value ? value.trim() : null).required = true;
  return closeIdx + 1;
}

function parseSlashPlaceholder(thisArgs, path, slashColonIdx) {
  const backslashIdx = path.indexOf('/', slashColonIdx + 1);
  const lastIdx = backslashIdx < 0 ? Infinity : backslashIdx;
  const placeholder = path.slice(slashColonIdx + 1, lastIdx);
  const prop = placeholder.slice(1);
  pushArg(thisArgs, placeholder, prop).required = true;
  return lastIdx + 1;
}

function doParsePath(path, params, prefix) {
  let start = 0, thisArgs = [];
  params[keyPath(prefix)] = thisArgs;
  if (!path) {
    return;
  }
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
}

function keyPath(prefix) {
  return prefix + 'Path';
}

function keyQuery(prefix) {
  return prefix + 'Query';
}

function doParseSlicedUrl(url, params, urls, prefix) {
  const [path, query] = url ? url.split('?') : EMPTY_ARR;
  urls[keyPath(prefix)] = path;
  urls[keyQuery(prefix)] = query;
  doParsePath(path, params, prefix);
  doParseQueryArgs(query, params, prefix);
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
    const {value, prop} = thisArgs[i];
    if (prop) {
      result.push(`${prop}=${value || ''}`);
    }
  }
  return result.join('&');
}

function joinOn(path, query, char) {
  return (path && query) ? `${path}${char}${query}` : path;
}

export function simpleUrl(urls, params) {
  return formatPath((urls || EMPTY_ARR).hrefPath, (params || EMPTY_ARR).hrefPath);
}

export function formatUrl(urls, params) {
  const thisUrls = urls || {}, thisArgs = params || {};
  const hrefPath = formatPath(thisUrls.hrefPath, thisArgs.hrefPath);
  const hrefQuery = formatQuery(thisArgs.hrefQuery);
  const href = joinOn(hrefPath, hrefQuery, '?');
  const hashPath = formatPath(thisUrls.hashPath, thisArgs.hashPath);
  const hashQuery = formatQuery(thisArgs.hashQuery);
  return joinOn(href, joinOn(hashPath, hashQuery, '?'), '#');
}