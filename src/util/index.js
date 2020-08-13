export function jsonCopy(json) {
  return JSON.parse(JSON.stringify(json));
}

export function concatUrls(...urls) {
  let resultUrl = (urls[0] || ''), {length} = urls;
  for (let i = 1; i < length; i++) {
    const url = urls[i];
    if (!url) {
      continue;
    }
    if (resultUrl.slice(-1) === '/') {
      resultUrl = url.substr(0, 1) === '/' ? `${resultUrl}${url.slice(1)}` : resultUrl + url;
    } else {
      resultUrl = url.substr(0, 1) === '/' ? (resultUrl + url) : `${resultUrl}/${url}`;
    }
  }
  return (this === true && resultUrl.charAt(0) === '/') ? resultUrl.slice(1) : resultUrl;
}