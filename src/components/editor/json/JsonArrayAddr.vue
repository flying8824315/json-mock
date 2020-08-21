<template>
  <div class="json-flex json-pair json-pair-add">
    <div class="flex-center json-arr-idx"><span>N</span></div>
    <JsonProperty class="flex-1"/>
    <div><ElButton circle icon="el-icon-check" type="primary"/></div>
    <ElButton circle icon="el-icon-close"/>
  </div>
</template>

<script>
export default {
  name: 'JsonArrayAddr',
  components: {
    JsonProperty: () => import('./JsonProperty'),
  },
};
</script>

<style scoped>

</style>
