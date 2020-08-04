export const BaseMixin = {
  props: {
    value: [Object, Array, String, Number],
    placeholder: String,
    labelJustify: Boolean,
    labelWidth: String,
    label: String,
    prop: String,
    required: Boolean,
    disabled: Boolean,
    viewonly: Boolean,
    clearable: {
      type: Boolean,
      default: true,
    },
    size: String,
    name: String,
    rules: [Object, Array],
    clearGaps: Boolean,
    hideColon: {
      type: Boolean,
      default: false,
    },
    defaultColon: {
      type: String,
      default: '：',
    },
  },
  computed: {
    labelVal({label, hideColon, defaultColon}) {
      if (!label) {
        return '';
      }
      const last = (label || '').slice(-1);
      if (hideColon) {
        return (last === ':' || last === '：') ? label.slice(0, -1) : label;
      } else {
        return (last === ':' || last === '：') ? label : `${label}${defaultColon}`;
      }
    },
    currentVal: {
      get({value, currentCached}) {
        return value === undefined ? currentCached : value;
      },
      set(val) {
        const {value} = this;
        if (value === undefined) {
          this.currentCached = val;
        } else {
          this.$emit('input', val);
        }
      },
    },
    currentPlaceholder({placeholder, label}) {
      return placeholder || label;
    },
  },
  data() {
    return {
      currentCached: null,
    };
  },
  methods: {
    onBlur(e) {
      this.$emit('blur', e);
    },
    onFocus(e) {
      this.$emit('focus', e);
    },
    onChange(e) {
      this.$emit('change', e);
    },
  },
};

export const OptionsMixin = {
  mixins: [BaseMixin],
  props: {
    options: Array,
    valueProp: {
      type: String,
      default: 'id',
    },
    labelProp: {
      type: String,
      default: 'name',
    },
    disabledProp: {
      type: String,
      default: 'disabled',
    },
  },
  computed: {
    activeLabel({currentVal, options = [], optionValue}) {
      const filtered = options.filter(opt => currentVal === optionValue(opt));
      return (filtered && filtered.length) ? this.optionLabel(filtered[0]) : '';
    },
    label2Val({options, optionLabel, optionValue}) {
      return options.reduce((map, opt) => {
        map[optionLabel(opt)] = optionValue(opt);
        return map;
      }, {});
    },
  },
  methods: {
    optionKey(option, idx) {
      const {valueProp: prop} = this;
      const key = prop ? option[prop] : option;
      return typeof key === 'object' ? idx : key;
    },
    optionValue(option) {
      const {valueProp: prop} = this;
      return prop ? option[prop] : option;
    },
    optionLabel(option) {
      const {labelProp: prop} = this;
      return prop ? option[prop] : option;
    },
    optionDisabled(option) {
      const {disabledProp: prop} = this;
      return prop ? (option[prop] || false) : option;
    },
    onChange(label) {
      this.$emit('change', this.label2Val[label]);
    },
  },
};

export const TagInputProps = {
  props: {
    value: [Array, String],
    separator: {
      type: String,
      default: ',',
    },
    placeholder: {
      type: String,
      default: '新增',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    inputClass: [String, Array, Object],
    inputStyle: [String, Array, Object],
  },
};
