export function objectHasKey(object) {
  return object && Object.keys(object).length;
}

const coreToStr = Object.prototype.toString;

export function typeOf(obj) {
  return coreToStr.call(obj).slice(8, -1);
}