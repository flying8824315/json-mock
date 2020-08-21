<template>
  <ElButton @click="onFold" class="w-140">
    <span>Array({{ value.length }})</span>
    <ElIcon name="d-arrow-down"></ElIcon>
  </ElButton>
</template>

<script>
import {JsonObjValMixin} from './util';

export default {
  name: 'JsonValueArray',
  mixins: [JsonObjValMixin],
};
</script>

<style scoped>

</style>
