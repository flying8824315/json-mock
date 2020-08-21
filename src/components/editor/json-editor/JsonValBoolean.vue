<template>
  <ElRadioGroup v-if="editing" v-model="boolVal">
    <ElRadio :label="true">True</ElRadio>
    <ElRadio :label="false">False</ElRadio>
  </ElRadioGroup>
  <div v-else class="json-unit json-unit-bool">{{ value }}</div>
</template>

<script>
export default {
  name: 'JsonValBoolean',
  props: {
    value: Boolean,
    editing: Boolean,
  },
  computed: {
    boolVal: {
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
