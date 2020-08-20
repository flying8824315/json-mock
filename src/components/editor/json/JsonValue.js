import JsonValueNull from './JsonValueNull';
import JsonValueObject from './JsonValueObject';
import JsonValueArray from './JsonValueArray';
import JsonValueString from './JsonValueString';
import JsonValueNumber from './JsonValueNumber';
import JsonValueBoolean from './JsonValueBoolean';
import {typeOf} from './util';

const falseValues = [0, '', false, 'false', null];
const typedEditorObj = {
  Boolean: {
    editor: JsonValueBoolean,
    from(data) {
      return falseValues.indexOf(data) < 0;
    },
  },
  Null: {
    editor: JsonValueNull,
    from: () => null,
  },
  Object: {
    editor: JsonValueObject,
    from(data) {
      return Array.isArray(data) ? data.reduce((obj, value, idx) => {
        obj[idx] = value;
        return obj;
      }, {}) : {};
    },
  },
  Array: {
    editor: JsonValueArray,
    from(data, actDataType) {
      switch (actDataType) {
        case 'String':
        case 'Number':
        case 'Object':
        case 'Boolean':
          return [data];
      }
      return [];
    },
  },
  Number: {
    editor: JsonValueNumber,
    from(data) {
      if (data === true) {
        return 1;
      }
      if (data === false || data === '') {
        return 0;
      }
      const value = parseFloat(data);
      return isNaN(value) ? 0 : value;
    },
  },
  String: {
    editor: JsonValueString,
    from: data => data === null ? '' : data.toString(),
  },
};

const onNoneEvent = () => {
}, jsonValueClass = 'border-box padding-left-10 flex-1 flex-v-center';

export default {
  functional: true,
  name: 'JsonValue',
  props: {
    // 这个是期望的数据类型
    type: String,
    // 值，实际值的数据类型可能和期望数据类型不一致
    value: {default: undefined},
  },
  render(createElement, {
    props: {type, value},
    listeners: {
      input = onNoneEvent,
      onFold = onNoneEvent,
    },
  }) {
    const actType = typeOf(value), target = typedEditorObj[type];
    if (actType === type) {
      return createElement(target.editor, {
        attrs: {value}, on: {input, onFold},
      });
    } else {
      input(target.from(value, actType));
    }
  },
};
