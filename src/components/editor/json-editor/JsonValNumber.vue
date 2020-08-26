<template>
  <ElInputNumber
      v-if="editing"
      v-model="numVal"
      class="json-num-left"
      controls-position="right"
      placeholder="Property value"/>
  <div v-else class="json-unit json-unit-num">{{ value }}</div>
</template>

<script>
export default {
  name: 'JsonValNumber',
  props: {
    value: Number,
    editing: Boolean,
  },
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
.json-num-left{
  width: 100%;
  ::v-deep{
    input{
      text-align: left;
    }
  }
}
</style>
