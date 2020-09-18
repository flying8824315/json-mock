const coreToStr = Object.prototype.toString;

export function typeOf(obj) {
  return coreToStr.call(obj).slice(8, -1);
}

export const provideKey = 'imJsonProperties';

export const provideMixin = {};

export const dataTypes = [
  'Null',
  'Array',
  'Object',
  'Number',
  'String',
  'Boolean',
];

export const FoldMixin = {
  data() {
    return {
      folded: true,
    };
  },
  methods: {
    onFold(fold) {
      this.folded = fold;
      this.$emit('onFold', fold);
    },
  },
};

export const JsonObjValMixin = {
  props: {
    value: {},
    editing: Boolean,
  },
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
};

export function overrideObject(from, to) {
  const keys = (from ? Object.keys(from) : []);
  keys.forEach(key => {
    to[key] = from[key];
  });
}
