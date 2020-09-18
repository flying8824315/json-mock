<template>
  <ElButton v-if="editing" @click="onFold" class="w-140">
    <span>Object</span>
    <ElIcon name="d-arrow-down"></ElIcon>
  </ElButton>
  <ElTag class="mouse-pointer" v-else size="mini" @click="onFold">
    [<ElIcon name="more"></ElIcon>]({{value.length}})
  </ElTag>
</template>

<script>
import {JsonObjValMixin} from './util';

export default {
  name: 'JsonValArray',
  mixins: [JsonObjValMixin],
};
</script>

<style scoped>

</style>
