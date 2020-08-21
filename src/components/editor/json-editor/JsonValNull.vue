<template>
  <ElInput v-if="editing" value="null" class="json-input-null" disabled/>
  <div v-else class="json-unit json-unit-null">null</div>
</template>

<script>
export default {
  name: 'JsonValNull',
  props: {
    editing: Boolean,
  },
};
</script>

<style scoped lang="scss">
.json-input-null.el-input {
  ::v-deep {
    input {
      border-color: transparent;
      background: transparent;
      color: #777;
    }
  }
}
</style>
