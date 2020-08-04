import {Message} from 'element-ui';
import {defaultsAjaxFactory} from './defaults-ajax';
import {errorDefaultsKey} from '../vars';

const handlers = {
  // eslint-disable-next-line
  400(error) {
    const {response: {data}} = error;
    if (data) {
      Message.error(Array.isArray(data) ? data.join(';') : `${data}`);
    }
    return error;
  },
  // messages
  // eslint-disable-next-line
  // 'Network Error'({config: {url}}) {
  //   return MessageBox.alert(`不能访问服务器: ${url}`, {type: 'error'});
  // },
};

export function elementAjaxFactory(config, extraSettings = {}) {
  const {[errorDefaultsKey]: defaults, ...others} = extraSettings;
  return defaultsAjaxFactory(config, {
    ...others, [errorDefaultsKey]: {...handlers, ...defaults},
  });
}

export default elementAjaxFactory;
