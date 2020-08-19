<template>
  <div class="json-edit-object" :class="{'padding-bottom-15':thisLastIdx>=0}">
    <JsonKeyValuePair
        v-for="(kv,index) in transformedArr"
        :key="index"
        :key-value-pair="kv"
        :index="index"
        :theLast="index===thisLastIdx"
        @onDelete="onDelete"
        @onChangeVal="onChangeVal"
        @onChangeKey="onChangeKey"
        @onConfirmAdd="onConfirmAdd"/>
    <JsonKeyValueAddr
        class="margin-top-15"
        v-if="thisLastIdx<0"
        @onConfirmAdd="onConfirmAdd"/>
  </div>
</template>

<script>
import JsonKeyValuePair from '@/components/editor/json-editor/JsonKeyValuePair';
import JsonKeyValueAddr from '@/components/editor/json-editor/JsonKeyValueAddr';

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
    onChangeKey(oldKey, pair) {
      this.$delete(this.data, oldKey);
      this.$set(this.data, pair.key, pair.value);
    },
    onChangeVal(key, value) {
      this.data[key] = value;
    },
    onConfirmAdd(pair, index) {
      console.log(index,pair)
      this.transformedArr.splice(index, 0, pair);
      this.$set(this.data, pair.key, pair.value);
      this.thisLastIdx++;
      console.log(this.transformedArr)
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

<style scoped lang="scss">
.json-edit-object {
  padding-left: 10px;
  border-left: 1px solid;
}
</style>
