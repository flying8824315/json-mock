const excepted = 'function Proxy() { [native code] }',
  isSupportedProxy = Proxy && Proxy.toString() === excepted;

export function newProxy(target, handlers) {
  return new Proxy(target, handlers);
}

export function proxyOrOriginal(target, handlers) {
  return isSupportedProxy ? newProxy(target, handlers) : target;
}