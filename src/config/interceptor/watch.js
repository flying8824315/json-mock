import { typeOf } from '../util';

function createDoWatch(name) {
  return function doWatch(vm, watch, storage) {
    Object.keys(watch || {}).forEach(prop => {
      let dftVal = watch[prop], key = prop, innerKey;
      const type = typeOf(dftVal), {handler} = dftVal;
      if (type === 'Object') {
        innerKey = dftVal.key;
        dftVal = dftVal.default;
        const typeK = typeOf(innerKey);
        if (typeK === 'Function') {
          key = innerKey.call(vm, vm);
        } else if (typeK === 'String') {
          key = innerKey;
        }
      } else if (type === 'Function') {
        dftVal = dftVal.call(vm, vm);
      }
      const cacheKey = `treasure.${name}.${key}`;
      vm.$watch(prop, {
        handler(now = null) {
          storage.setItem(cacheKey, JSON.stringify(now));
          if (handler) {
            handler(now);
          }
        },
        immediate: true,
      });
      const val = storage.getItem(cacheKey);
      vm[prop] = (val && JSON.parse(val)) || dftVal;
    });
  };
}

export function mixinWatch(component) {
  const {sessionWatch: session, localWatch: local, name} = component;
  if (session || local) {
    const doWatch = createDoWatch(name);
    const mixins = component.mixins || [];
    mixins.push({
      created() {
        doWatch(this, session, sessionStorage);
        doWatch(this, local, localStorage);
      },
    });
    return {...component, mixins};
  }
  return component;
}
