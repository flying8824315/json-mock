const numberProp = (prop, dft = 0) => ({
  [prop]: {type: Number, default: dft},
});
export const TableGridMixin = {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    ...numberProp('index'),
    ...numberProp('gutter', 16),
    ...numberProp('columnsCount', 4),
  },
  methods: {
    getIndex(row, col) {
      const {columnsCount, index} = this;
      return (row * columnsCount) + col + index;
    },
  },
};