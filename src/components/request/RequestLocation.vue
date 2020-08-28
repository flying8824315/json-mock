<template>
  <div class="flex-v-center font-bolder height-36 request-url">
    <div class="border-box padding-h-10">
      <span
          title="点击复制"
          @click="onCopy"
          class="inline-block padding-right-8 align-middle request-url-copy">
      <ElIcon class="font-bolder" name="copy-document"></ElIcon>
      <span class="margin-left-5">Request URL:</span>
    </span>
    </div>
    <div class="flex-1 align-center request-selection">
      <ElLink
          type="primary"
          ref="displayUrl"
          :href="displayUrl"
          target="_blank"
          class="font-bolder align-middle">
        <span>{{ displayUrl }}</span>
      </ElLink>
    </div>
    <ElButton type="primary" @click="$emit('send')">发送</ElButton>
  </div>
</template>

<script>
import {clipboardCopy} from '@/util';

export default {
  name: 'RequestLocation',
  props: {
    displayUrl: String,
  },
  methods: {
    onCopy() {
      clipboardCopy(this.$refs.displayUrl.$el);
      this.$message.success('已复制');
    },
  },
};
</script>

<style scoped lang="scss">
.request-url-copy {
  cursor: pointer;
}


.request-url {
  background: rgba(#f2fbff, .1);

  & .request-selection:hover{
    background: #f2fbff;
  }
}
</style>
