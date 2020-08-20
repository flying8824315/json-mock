<template>
  <ElInputNumber
      v-model="numVal"
      class="json-num-left"
      controls-position="right"
      placeholder="Property value"/>
</template>

<script>
export default {
  name: 'JsonValueNumber',
  props: ['value'],
  computed: {
    numVal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.json-num-left {
  width: 100%;

  ::v-deep {
    .el-input input {
      text-align: left;
    }
  }
}
</style>
