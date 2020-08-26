<template>
  <ElButtonGroup v-if="editing">
    <ElButton
        type="primary"
        @click="$emit('onConfirmEditing')"
        icon="el-icon-check"
        circle/>
    <ElButton
        v-if="hasCancel"
        @click="$emit('onCancelEditing')"
        icon="el-icon-close"
        circle/>
  </ElButtonGroup>
  <div v-else class="json-pair-op">
    <ElTag @click="$emit('onAdding')" size="mini" type="success">
      <ElIcon name="plus"></ElIcon>
    </ElTag>
    <ElTag @click="$emit('onDelete')" size="mini" type="success">
      <ElIcon name="remove-outline"></ElIcon>
    </ElTag>
  </div>
</template>

<script>
export default {
  name: 'JsonObjectCtrl',
  props: {
    editing: Boolean,
    hasCancel: Boolean,
  },
};
</script>

<style scoped>

</style>
