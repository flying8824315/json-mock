<template>
  <ElButton v-if="editing" @click="onFold" class="w-140">
    <span>Object</span>
    <ElIcon name="d-arrow-down"></ElIcon>
  </ElButton>
  <ElTag class="mouse-pointer" v-else size="mini" @click="onFold">
    <span>{</span>
    <span>{{keys}}</span>
    <span>}</span>
  </ElTag>
</template>

<script>
import {JsonObjValMixin} from './util';

export default {
  name: 'JsonValObject',
  mixins: [JsonObjValMixin],
  computed: {
    keys() {
      return Object.keys(this.value).slice(0,5).join(',');
    },
  },
};
</script>

<style scoped>

</style>
