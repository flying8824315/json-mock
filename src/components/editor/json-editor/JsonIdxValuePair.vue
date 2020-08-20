<template>
  <div class="flex flex-1">
    <ElSelect v-model="type" class="width-120">
      <ElOption v-for="type in types" :key="type" :label="type" :value="type"></ElOption>
    </ElSelect>
    <div class="flex-1 flex">
      <!--      <JsonArrValue-->
      <!--          :pair="keyValuePair"-->
      <!--          @onUnfold="onUnfold"-->
      <!--          @onChangeVal="onChangeVal"></JsonArrValue>-->
      <!--      <ElButton-->
      <!--          @click="$emit('onDelete', keyValuePair, index)"-->
      <!--          icon="el-icon-delete"/>-->
    </div>
  </div>
</template>

<script>
import {typeOf} from '@/components/editor/json-editor/util';
import {dataTypes} from '@/components/editor/json-editor/util';
import JsonArrValue from '@/components/editor/json-editor/JsonArrValue';

export default {
  name: 'JsonIdxValuePair',
  components: {JsonArrValue},
  props: {
    indexedValue: {
      default: undefined,
    },
    index: Number,
  },
  data() {
    return {
      types: dataTypes,

      type: null,
    };
  },
  watch: {
    indexedValue: {
      handler(data) {
        this.type = typeOf(data);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
