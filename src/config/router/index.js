import Vue from 'vue';
import VueRouter from 'vue-router';
import { applyInterceptors } from '../interceptor';
import {objectHasKey} from '../util';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => {
    return err;
  });
};

Vue.use(VueRouter);

const RouterPlaceholder = {
  name: 'RouterPlaceholder',
  render: h => h('RouterView'),
}, Placeholder = {
  name: 'Placeholder',
  render: h => h(''),
};

const defaultsGetter = (v = true) => ({props: v, placeholder: v, redirect: v});

function getRouteDefaults(route, parentDefaults) {
  if (typeof route === 'boolean') {
    return defaultsGetter(route);
  }
  const parentType = typeof parentDefaults, {defaults} = route;
  if (parentType === 'boolean') {
    parentDefaults = defaultsGetter(parentDefaults);
  } else if (parentType === 'undefined') {
    parentDefaults = defaultsGetter();
  }
  if (defaults == null) {
    return parentDefaults;
  } else if (typeof defaults === 'boolean') {
    return defaultsGetter(defaults);
  } else {
    return {...parentDefaults, ...defaults};
  }
}

/**
 * eslint-disable
 * 添加默认路由，格式化路径
 *
 * meta 说明：
 *
 * @param routes
 * @param root
 * @returns {Array}
 */
export function routesFactory(routes, root = '/', parentDefaults) {
  const opts = [], len = routes.length;
  for (let i = 0; i < len; i++) {
    const route = routes[i];
    const defaults = getRouteDefaults(route, parentDefaults);
    const {props, placeholder} = defaults;
    let {path, children, component, components} = route;
    const hasComponents = objectHasKey(components);
    // route path
    path = path[0] === '/' ? path : root + path;
    route.path = path;

    if (props) {
      const {props: defProps} = route;
      if (component) {
        route.props = defProps === undefined ? true : defProps;
      }
      if (hasComponents) {
        route.props = {
          ...Object.keys(components).reduce((res, key) => {
            res[key] = true;
            return res;
          }, {}),
          ...defProps,
        };
      }
    }
    // children & component property
    if (children && children.length) {
      const nsRoot = path[path.length - 1] === '/' ? path : (path + '/');
      route.children = routesFactory(children, nsRoot, defaults);
      if (placeholder && !component) {
        route.component = RouterPlaceholder;
      }
    } else if (placeholder && !component) {
      route.component = Placeholder;
    }
    if (hasComponents) {
      route.components = applyInterceptors(components, true);
    }
    if (component) {
      route.component = applyInterceptors(component, false);
    }
    opts.push(route);
  }
  // default redirect
  if (parentDefaults.redirect && (root !== opts[0].path && opts[len - 1].path !== root)) {
    opts.push({
      path: root, redirect: opts[0].path, meta: {inNav: false},
    });
  }
  return opts;
}

export function routerFactory(config, withDefaults = true) {
  const {routes, ...cfg} = config || {};
  cfg.routes = routesFactory(routes, cfg.base, getRouteDefaults(withDefaults, true));
  return new VueRouter(cfg);
}

routerFactory.new = config => new VueRouter(config);

export default routerFactory;
