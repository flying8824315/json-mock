<script>
import JsonValNull from './JsonValNull';
import JsonValArray from './JsonValArray';
import JsonValObject from './JsonValObject';
import JsonValString from './JsonValString';
import JsonValNumber from './JsonValNumber';
import JsonValBoolean from './JsonValBoolean';

import {typeOf} from './util';

const falseValues = [0, '', false, 'false', null], onNoneEvent = () => {
}, typedEditorObj = {
  Boolean: {
    editor: JsonValBoolean,
    from(data) {
      return falseValues.indexOf(data) < 0;
    },
  },
  Null: {
    editor: JsonValNull,
    from: () => null,
  },
  Object: {
    editor: JsonValObject,
    from(data) {
      return Array.isArray(data) ? data.reduce((obj, value, idx) => {
        obj[idx] = value;
        return obj;
      }, {}) : {};
    },
  },
  Array: {
    editor: JsonValArray,
    from(data, actDataType) {
      switch (actDataType) {
        case 'String':
          return data ? [data] : [];
        case 'Number':
        case 'Object':
        case 'Boolean':
          return [data];
      }
      return [];
    },
  },
  Number: {
    editor: JsonValNumber,
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
    editor: JsonValString,
    from: data => data === null ? '' : data.toString(),
  },
};

export default {
  functional: true,
  name: 'JsonValue',
  props: {
    // 这个是期望的数据类型
    type: String,
    // 值，实际值的数据类型可能和期望数据类型不一致
    value: {default: undefined},
    editing: Boolean,
  },
  // eslint-disable-next-line vue/require-render-return
  render(createElement, {
    props: {type, value, editing},
    listeners: {
      input = onNoneEvent,
      onFold = onNoneEvent,
      onEditing = onNoneEvent,
    },
  }) {
    const actType = typeOf(value), target = typedEditorObj[type];
    if (actType === type) {
      return createElement('div', {
        class: 'width-full',
      }, [
        createElement(target.editor, {
          attrs: {value, editing}, on: {input, onFold, onEditing},
        }),
      ]);
    } else {
      input(target.from(value, actType));
    }
  },
};
</script>

<style scoped>

</style>
