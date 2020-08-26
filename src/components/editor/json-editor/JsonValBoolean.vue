<template>
  <ElRadioGroup v-if="editing" v-model="boolVal" class="w-180 ml-20">
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
.w-180{
  width: 180px;
}
</style>
