import {newProxy} from '../proxy';

function storageFactory(storage) {
  const $getSync = (key, defaultValue = null) => {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }, $setSync = (key, value) => {
    if (value !== undefined) {
      storage.setItem(key, JSON.stringify(value));
    }
  };
  const storageProxy = {
    // 同步
    $getItem: storage.getItem,
    $setItem: storage.setItem,
    // 同步 & JSON.parse & defaultValue
    $getSync,
    $setSync,
    // Promise & JSON.parse & defaultValue
    $get(key, defaultValue) {
      return new Promise((resolve, reject) => {
        const value = storage.getItem(key);
        if (value) {
          resolve(JSON.parse(value) || defaultValue);
        } else if (defaultValue === undefined) {
          reject(key);
        } else {
          resolve(defaultValue);
        }
      });
    },
    $set(key, data) {
      return new Promise(resolve => {
        $setSync(key, data);
        resolve();
      });
    },
  };
  return {
    enumerable: false,
    get() {
      return newProxy(storageProxy, {
        get(src, key) {
          return src[key] || JSON.parse(storage.getItem(key));
        },
        set(src, key, value) {
          const notUndef = value !== undefined;
          if (notUndef) {
            storage.setItem(key, JSON.stringify(value));
          }
          return notUndef;
        },
      });
    },
  };
}

/**
 * 自动 JSON.stringify & JSON.parse 转换；
 * 默认 Promise 异步：get、set
 * 支持同步：
 * @type {{install(*): void}}
 */
export const storagePlugin = {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $local: storageFactory(localStorage),
      $session: storageFactory(sessionStorage),
    });
  },
};
