<template>
  <ElInput value="null" class="json-null" disabled/>
</template>

<script>
export default {
  name: 'JsonValueNull',
};
</script>

<style scoped lang="scss">
.json-null.el-input {
  ::v-deep {
    input {
      border-color: transparent;
      background: transparent;
      color: #777;
    }
  }
}
</style>
