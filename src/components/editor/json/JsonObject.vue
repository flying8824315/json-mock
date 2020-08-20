<template>
  <div>
    <JsonObjectPair
        v-for="(pair,idx) in transformedArr"
        :key="idx"
        :index="idx"
        :pair="pair"
        @onInputVal="onInputVal"/>
    <JsonObjectAddr v-if="theLastIdx<0"/>
  </div>
</template>

<script>
import JsonObjectPair from './JsonObjectPair';
import JsonObjectAddr from './JsonObjectAddr';
import {typeOf} from './util';

export default {
  name: 'JsonObject',
  components: {JsonObjectPair, JsonObjectAddr},
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
    onInputVal(value, pair) {
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
