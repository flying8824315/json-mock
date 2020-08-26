<template>
  <ElInput
      style="max-width: 280px;"
      v-if="editing"
      :value="value"
      clearable
      autofocus
      placeholder="Property name"
      @input="onInputKey"
      @focus="$emit('focus')"
      @blur="$emit('blur')"/>
  <div class="json-flex" v-else @click="$emit('onEditing')">
    <div class="json-obj-key">"{{ value }}"</div>
    <div>:</div>
  </div>
</template>

<script>
export default {
  name: 'JsonObjectKey',
  props: {
    value: String,
    editing: Boolean,
  },
  methods: {
    onInputKey(key) {
      this.$emit('input', key);
    },
  },
};
</script>

<style scoped lang="scss">
.json-obj-key {
  padding: 0 2px;
  border-radius: 3px;
  transition-duration: .2s;

  &:hover {
    background: #DDD;
  }
}
</style>
