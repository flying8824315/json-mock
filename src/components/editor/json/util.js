const coreToStr = Object.prototype.toString;

export function typeOf(obj) {
  return coreToStr.call(obj).slice(8, -1);
}

export const provideKey = 'imJsonProperties';

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
  computed: {
    thisEditing() {
      return this.editing;
    },
    elTagSize() {
      return this.thisEditing ? 'undefined' : 'mini';
    },
    elTagType() {
      return this.thisEditing ? 'info' : 'primary';
    },
  },
  methods: {
    onFold() {
      const fold = !this.folded;
      this.folded = fold;
      this.$emit('onFold', fold);
    },
    onNoneEditFold() {
      if (!this.thisEditing) {
        this.onFold();
      }
    },
  },
};
