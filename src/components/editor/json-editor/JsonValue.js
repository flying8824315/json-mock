const typedEditorObj = {
  Null: {
    name: 'JsonValueNullEditor',
    render(h) {
      this.$emit('input', null);
      return h('ElInput', {
        attrs: {disabled: true, value: 'null'},
      });
    },
  },
  Object: {
    name: 'JsonValueObjectEditor',
    props: ['value'],
    data() {
      return {
        unfolded: false,
      };
    },
    render(h) {
      const self = this, {value, unfolded} = self;
      if (!(value instanceof Object)) {
        this.$emit('input', {});
      }
      return h('div', {}, [h('ElButton', {
        class: 'min-width-btn',
        on: {
          click() {
            self.unfolded = !self.unfolded;
            self.$emit('onUnfold');
          },
        },
      }, [
        'Object',
        h('ElIcon', {
          class: 'margin-left-10',
          attrs: {name: unfolded ? 'arrow-down' : 'd-arrow-right'},
        }),
      ])]);
    },
  },
  Array: {
    name: 'JsonValueArrayEditor',
    props: ['value'],
    data() {
      return {
        unfolded: false,
      };
    },
    render(h) {
      const self = this, {value, unfolded} = self;
      const isArr = value instanceof Array;
      if (!isArr) {
        this.$emit('input', []);
      }
      const length = isArr ? value.length : 0;
      return h('div', {}, [h('ElButton', {
        attrs: {icon: 'el-icon-d-arrow-right'},
        class: 'min-width-btn',
        on: {
          click() {
            self.$emit('onUnfold');
          },
        },
      }, [`Array(${length})`, h('ElIcon', {
        class: 'margin-left-10',
        attrs: {name: unfolded ? 'arrow-down' : 'd-arrow-right'},
      })])]);
    },
  },
  Boolean: {
    name: 'JsonValueBooleanEditor',
    props: ['value'],
    render(createElement) {
      const {$listeners: {input}, value} = this;
      if (value === true || value === false) {
        return createElement('div', {
          class: 'flex-v-center height-full',
        }, [
          createElement('ElRadioGroup', {
            attrs: {value: value ? 'true' : 'false'},
            on: {input: v => input(v === 'true')},
          }, [
            createElement('ElRadioButton', {
              attrs: {label: 'true'},
            }),
            createElement('ElRadioButton', {
              attrs: {label: 'false'},
            }),
          ]),
        ]);
      } else {
        input(value === 'false' ? false : !!value);
      }
    },
  },
  Number: {
    name: 'JsonValueNumberEditor',
    props: ['value'],
    render(h) {
      const {$listeners: {input}, value} = this;
      if (typeof value === 'number') {
        return h('ElInputNumber', {
          class: 'width-full input-align-left',
          attrs: {value, clearable: true, 'controls-position': 'right'},
          on: {input},
        });
      } else {
        const tempVal = (value === true || value === 'true') ? 1 : parseFloat(value);
        const thisVal = isNaN(tempVal) ? 0 : tempVal;
        input(thisVal);
      }
    },
  },
  String: {
    name: 'JsonValueStringEditor',
    props: ['value'],
    render(h) {
      const {$listeners: {input}, value} = this;
      if (typeof value === 'string') {
        return h('ElInput', {
          attrs: {
            value,
            clearable: true,
            autofocus: true,
          },
          on: {input},
        });
      } else {
        input(value == null ? '' : value + '');
      }
    },
  },
};

const onNoneEvent = () => {
}, jsonValueClass = 'border-box padding-left-10 flex-1 flex-v-center';

export default {
  functional: true,
  name: 'JsonValue',
  props: {pair: Object},
  render(createElement, {
    props: {pair}, listeners: {
      onChangeVal = onNoneEvent,
      onUnfold = onNoneEvent,
    },
  }) {
    const {type, value, key} = pair;
    const editor = typedEditorObj[type];
    return createElement('div', {
      class: jsonValueClass,
    }, [
      createElement(editor, {
        props: {value},
        on: {
          onUnfold, input(v) {
            pair.value = v;
            onChangeVal(key, v);
          },
        },
      }),
    ]);
  },
};
