<template>
  <div>
    <JsonObjectPair
        v-for="(pair,idx) in transformedArr"
        :key="idx"
        :index="idx"
        :pair="pair"/>
  </div>
</template>

<script>
import JsonObjectPair from './JsonObjectPair';
import {typeOf} from './util';

export default {
  name: 'JsonObject',
  components: {JsonObjectPair},
  props: ['value'],
  data() {
    return {
      transformedArr: [],
      theLastIdx: 0,
    };
  },
  watch: {
    value: {
      handler(value, old) {
        if (!value) {
          this.$emit('input', {});
        } else if (value !== old) {
          const arr = this.doTransform(value);
          this.theLastIdx = arr.length - 1;
          this.transformedArr = arr;
        }
      },
      immediate: true,
    },
  },
  methods: {
    onDelete(pair, idx) {
      this.transformedArr.splice(idx, 1);
      this.$delete(this.value, pair.key);
    },
    onInputKey(pair, oldKey) {
      const {value} = this;
      this.$delete(value, oldKey);
      this.$set(value, pair.key, pair.value);
    },
    onInputVal(value, pair) {
      pair.value = value;
      this.value[pair.key] = value;
    },
    doTransform(data) {
      const resultArr = [];
      for (let key in data) {
        const value = data[key];
        resultArr.push({
          key,
          value,
          available: true,
          type: value === undefined ? 'Null' : typeOf(value),
        });
      }
      return resultArr;
    },
  },
};
</script>

<style scoped>

</style>
