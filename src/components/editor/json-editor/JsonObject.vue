<template>
  <div class="padding-bottom-20">
    <JsonKeyValuePair
        v-for="(kv,index) in transformedArr"
        :key="index"
        :key-value-pair="kv"
        :index="index"
        :theLast="index===thisLastIdx"
        @onDelete="onDelete"
        @onChangeVal="onChangeVal"
        @onConfirmAdd="onConfirmAdd"/>
    <JsonKeyValueAddr
        class="margin-top-20"
        v-if="thisLastIdx<0"
        @onConfirmAdd="onConfirmAdd"/>
  </div>
</template>

<script>
import JsonKeyValuePair from '@/components/editor/json-editor/JsonKeyValuePair';
import JsonKeyValueAddr from '@/components/editor/json-editor/JsonKeyValueAddr';
import {jsonCopy} from '@/util';

const coreToStr = Object.prototype.toString;

function typeOf(obj) {
  return coreToStr.call(obj).slice(8, -1);
}

export default {
  name: 'JsonObject',
  components: {JsonKeyValuePair, JsonKeyValueAddr},
  model: {
    prop: 'data',
  },
  props: {
    data: Object,
  },
  data() {
    return {
      transformedArr: [],
      thisLastIdx: 0,
    };
  },
  watch: {
    data: {
      handler(data) {
        if (!data) {
          this.$emit('input', {});
        } else {
          const arr = this.doTransform(data);
          console.log(jsonCopy(arr));
          this.transformedArr = arr;
          this.thisLastIdx = arr.length - 1;
        }
      },
      immediate: true,
    },
  },
  computed: {
    originObj({data}) {
      return data;
    },
  },
  methods: {
    onDisplay() {
      console.log(this.transformedArr);
    },
    onDelete(pair, index) {
      this.transformedArr.splice(index, 1);
      this.thisLastIdx--;
      this.$delete(this.data, pair.key);
    },
    onChangeVal(key, value) {
      this.data[key] = value;
    },
    onConfirmAdd(pair, index) {
      this.transformedArr.splice(index, 0, pair);
      this.thisLastIdx++;
      this.$set(this.data, pair.key, pair.value);
    },
    doTransform(data) {
      if (data) {
        const resultArr = [];
        for (let key in data) {
          const value = data[key];
          resultArr.push({
            key,
            value,
            available: true,
            type: value === undefined ? 'String' : typeOf(value),
          });
        }
        return resultArr;
      }
      return [];
    },
  },
};
</script>

<style scoped>

</style>
