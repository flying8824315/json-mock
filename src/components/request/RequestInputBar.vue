<template>
  <div class="request-input-bar">
    <div>
      <ElButton class="relative">
        <ElIcon style="opacity: 0;" name="s-tools"></ElIcon>
        <ElIcon class="absolute-center font-size-16" name="s-tools"></ElIcon>
      </ElButton>
    </div>
    <div>
      <ElSelect
          class="request-field-method"
          v-model="request.method"
          placeholder="请选择">
        <ElOption
            v-for="method in requestMethods"
            :label="method"
            :value="method"
            :key="method"/>
      </ElSelect>
    </div>
    <div class="flex-1">
      <ElInput placeholder="请求地址" v-model="request.url"></ElInput>
    </div>
    <div>
      <ElButton type="primary">发送</ElButton>
    </div>
  </div>
</template>

<script>
function defaultRequestProp() {
  return {method: 'GET', url: ''};
}

export default {
  name: 'RequestInputBar',
  props: {
    request: {
      type: Object,
      default: defaultRequestProp,
    },
  },
  data() {
    return {
      requestMethods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'HEAD',
        'CONNECT',
        'OPTIONS',
        'TRACE',
        'PATCH',
      ],
    };
  },
  watch: {
    request(now) {
      // eslint-disable-next-line no-prototype-builtins
      if (!now.hasOwnProperty('url')) {
        this.$set(now, 'url', '');
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!now.hasOwnProperty('method')) {
        this.$set(now, 'method', 'GET');
      }
    },
  },
};
</script>

<style lang="scss">
.request-input-bar {
  display: flex;

  & > div {
    //padding: 0 2px;
    box-sizing: border-box;
  }

  & > div:first-child {
    padding-left: 0;
  }

  & > div:last-child {
    padding-right: 0;
  }

  .request-field-method .el-input {
    width: 120px;
  }
}
</style>