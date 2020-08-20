<template>
  <ElButton @click="onFold">
    <span>Object</span>
    <ElIcon name="d-arrow-down"></ElIcon>
  </ElButton>
</template>

<script>
import {JsonObjValMixin} from './util';

export default {
  name: 'JsonValueObject',
  mixins: [JsonObjValMixin],
};
</script>

<style scoped>

</style>
