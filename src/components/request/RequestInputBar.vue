<template>
  <div class="request-input-bar">
    <div>
      <ElSelect
          class="request-field-method"
          v-model="request.method"
          allow-create
          filterable
          default-first-option
          placeholder="请选择">
        <ElOption
            v-for="method in requestMethods"
            :label="method"
            :value="method"
            :key="method"/>
      </ElSelect>
    </div>
    <div class="flex-1">
      <ElAutocomplete
          class="width-full"
          v-model="request.url"
          :fetch-suggestions="onFetchDetail"
          placeholder="请求地址"
          :trigger-on-focus="false"
          @select="onSelected"
      ></ElAutocomplete>
      <!--
      <ElInput
          class="input-url"
          placeholder="请求地址"
          v-model="request.url"
          clearable></ElInput>
          -->
    </div>
    <div>
      <ElButton @click="$emit('onSendRequest')" type="primary">发送</ElButton>
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
  methods: {
    onSelected() {
    },
    onFetchDetail() {
    },
  },
};
</script>

<style lang="scss">
.request-input-bar {
  display: flex;

  & > div {
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

  & input {
    font-weight: 600;
    font-size: 13px;
    letter-spacing: .5px;
  }
}
</style>