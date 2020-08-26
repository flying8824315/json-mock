<template>
  <ElTag class="mouse-pointer"
      :size="elTagSize"
      :type="elTagType"
      @click="onNoneEditFold">
    <span>{</span>
    <span>{{ keys }}</span>
    <span>}</span>
  </ElTag>
</template>

<script>
import {JsonObjValMixin} from './util';

const factor = 3;

export default {
  name: 'JsonValObject',
  mixins: [JsonObjValMixin],
  computed: {
    keys() {
      if (this.thisEditing) {
        return '';
      }
      const keys = Object.keys(this.value);
      if (keys.length > factor) {
        return keys.slice(0, factor).join(',') + ',..';
      }
      return keys.join(',');
    },
  },
};
</script>

<style scoped>

</style>
