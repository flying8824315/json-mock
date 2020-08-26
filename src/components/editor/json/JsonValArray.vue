<template>
  <ElTag class="mouse-pointer"
      :size="elTagSize"
      :type="elTagType"
      @click="onNoneEditFold">
    [..]({{ value.length }})
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
