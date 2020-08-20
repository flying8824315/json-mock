<template>
  <div>
    <JsonIdxValuePair v-for="(pair,idx) in transformedArr"
        :key="idx"
        :index="idx"
        :idxValuePair="pair"
        @onChangeVal="onChangeVal"/>
  </div>
</template>

<script>
import JsonIdxValuePair from '@/components/editor/json-editor/JsonIdxValuePair';

export default {
  name: 'JsonArray',
  components: {JsonIdxValuePair},
  props: {
    data: Array,
  },
  data() {
    return {
      transformedArr: [],
      thisLastIdx: 0,
    };
  },
  watch: {
    data: {
      handler(data, old) {
        if (!data) {
          this.$emit('input', []);
        } else if (data !== old) {
          this.transformedArr = data;
          this.thisLastIdx = data.length - 1;
        }
      },
      immediate: true,
    },
  },
  methods:{
    onChangeVal(idx,value){
      this.transformedArr[idx] = value;
    }
  },
};
</script>

<style scoped>

</style>
