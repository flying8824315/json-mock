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

export function clipboardCopy(elem, autoClear = false) {
  if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
    elem.select();
  } else {
    const range = document.createRange();
    const end = elem.childNodes.length;
    range.setStart(elem, 0);
    range.setEnd(elem, end);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    if (autoClear) {
      setTimeout(() => {
        range && selection.removeRange(range);
      });
    }
  }
  document.execCommand('copy', false, null);
}
