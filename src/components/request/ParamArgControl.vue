<template>
  <div class="request-arg-config">
    <ElPopover
        ref="popover"
        v-model="visibility"
        trigger="manual"
        placement="bottom-end">
      <ElButton
          slot="reference"
          @click="onClick"
          @contextmenu.native.prevent="onContextmenu"
          icon="el-icon-position"></ElButton>
      <RequestArgConfig/>
    </ElPopover>
    <ElButton
        v-if="!param.required"
        @click="param.available=false"
        icon="el-icon-close"/>
  </div>
</template>

<script>
import {on, off} from 'element-ui/src/utils/dom';
import RequestArgConfig from '@/components/request/RequestArgConfig';

export default {
  name: 'ParamArgControl',
  components: {RequestArgConfig},
  props: {param: Object},
  data() {
    return {
      visibility: false,
    };
  },
  methods: {
    onClick() {
      console.log('======<');
    },
    onContextmenu() {
      this.visibility = true;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const {popover} = this.$refs;
      on(document, 'click', popover.handleDocumentClick);
      on(document, 'contextmenu', popover.handleDocumentClick);
    });
  },
  beforeDestroy() {
    const {popover} = this.$refs;
    off(document, 'click', popover.handleDocumentClick);
    off(document, 'contextmenu', popover.handleDocumentClick);
  },
};
</script>
<style lang="scss">
.request-arg-config {
  padding-top: 1px;

  & .el-button {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
<style scoped>

</style>
