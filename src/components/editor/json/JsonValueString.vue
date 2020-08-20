<template>
  <ElInput
      v-model="stringVal"
      placeholder="Property value"
      clearable/>
</template>

<script>
export default {
  name: 'JsonValueString',
  props: ['value'],
  computed: {
    stringVal: {
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

<style scoped>

</style>
