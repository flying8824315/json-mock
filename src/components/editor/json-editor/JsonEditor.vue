<template>
  <div class="json-editor">
    <JsonObject :data="data" @input="onInput"></JsonObject>
  </div>
</template>

<script>
import JsonObject from '@/components/editor/json-editor/JsonObject';

export default {
  name: 'JsonFormEditor',
  components: {JsonObject},
  model: {
    prop: 'data',
  },
  props: {
    data: Object,
  },
  methods: {
    onInput(data) {
      this.$emit('input', data);
    },
  },
};
</script>

<style scoped lang="scss">
.json-editor {
  ::v-deep {
    .json-colon {
      font-family: 'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace;
      font-size: 14px;
      text-align: center;
      line-height: 2;
    }

    .input-align-left input {
      text-align: left;
    }

    .min-width-btn {
      min-width: 120px;
    }
  }
}
</style>
