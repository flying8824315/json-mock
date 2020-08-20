const coreToStr = Object.prototype.toString;

export function typeOf(obj) {
  return coreToStr.call(obj).slice(8, -1);
}

export const dataTypes = [
  'Null',
  'Array',
  'Object',
  'Number',
  'String',
  'Boolean',
];

export const JsonObjValMixin = {
  props: ['value'],
  data() {
    return {
      folded: true,
    };
  },
  methods: {
    onFold() {
      const fold = !this.folded;
      this.folded = fold;
      this.$emit('onFold', fold);
    },
  },
}
