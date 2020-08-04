import { mixinWatch } from './watch';
import { mixinPropsComputed } from './props';
import { objectHasKey } from '../util';

const interceptors = [
  // localWatch, sessionWatch :storage watched
  mixinWatch,
  // mixinPropsComputed : 设置 visible 计算属性
  mixinPropsComputed,
];

function applyComponents(components) {
  if (components) {
    Object.keys(components).forEach(name => {
      // eslint-disable-next-line
      components[name] = applyComponent(components[name]);
    });
  }
  return components;
}

function applyComponent(component) {
  if (typeof component === 'object') {
    const mixins = component.mixins || [];
    interceptors.forEach(interceptor => {
      component = interceptor(component, mixins);
    });
    const {components} = component;
    if (objectHasKey(components)) {
      component.components = applyComponents(components);
    }
  }
  return component;
}

export function applyInterceptors(components, isComponents) {
  return (isComponents ? applyComponents : applyComponent)(components);
}

export default applyInterceptors;
