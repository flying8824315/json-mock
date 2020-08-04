import { objectHasKey, typeOf } from '../util';

const NONE = {}, alias = 'computedAs';

export function mixinPropsComputed(component) {
  const {props = {}} = component;
  if (typeOf(props) === 'Object') {
    const mixins = component.mixins || [];
    const keys = Object.keys(props), computed = {};
    if (keys.length) {
      keys.forEach(propName => {
        const {[alias]: prop} = props[propName] || NONE;
        if (prop) {
          computed[prop] = {
            get: vm => vm[propName],
            set(value) {
              this.$emit(`update:${propName}`, value);
            },
          };
        }
      });
      if (objectHasKey(computed)) {
        mixins.push({computed});
        return {...component, mixins};
      }
    }
  }
  return component;
}
