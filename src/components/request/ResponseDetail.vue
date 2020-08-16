<template>
  <ElCollapse class="margin-top-20 response-detail-container">
    <ElCollapseItem>
      <div slot="title" class="padding-left-15 font-bolder">
        Response
      </div>
    </ElCollapseItem>
  </ElCollapse>
</template>

<script>
export default {
  name: 'ResponseDetail',
};
</script>

<style scoped>
.response-detail-container {
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
</style>