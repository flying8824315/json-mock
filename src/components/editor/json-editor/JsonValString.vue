<template>
  <ElInput
      v-if="editing"
      v-model="stringVal"
      placeholder="Property value"
      clearable/>
  <div v-else class="json-unit json-unit-str">
    "{{ value }}"
  </div>
</template>

<script>
export default {
  name: 'JsonValString',
  props: {
    value: String,
    editing: Boolean,
  },
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
