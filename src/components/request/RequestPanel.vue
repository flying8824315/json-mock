<template>
  <div>
    <ElInput placeholder="请输入内容" v-model="request.url">
      <ElSelect class="request-select" v-model="request.method" slot="prepend" placeholder="请选择">
        <ElOption
            v-for="method in requestMethods"
            :label="method"
            :value="method"
            :key="method"/>
      </ElSelect>
      <ElButton slot="append">发送</ElButton>
    </ElInput>
  </div>
</template>

<script>
export default {
  name: 'RequestPanel',
  data() {
    return {
      request: {
        method: 'GET',
        url: '',
      },

      input3: '',
      select: '',

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
      ]
    }
  },
};
</script>
<style>
.request-select.el-select .el-input {
  width: 80px;
}
</style>
<style scoped>

</style>