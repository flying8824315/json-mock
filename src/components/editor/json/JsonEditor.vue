<template>
  <JsonProperty class="json-editor" :value="value" @input="onInput"></JsonProperty>
</template>

<script>
import JsonProperty from '@/components/editor/json/JsonProperty';

export default {
  name: 'JsonEditor',
  components: {JsonProperty},
  props: ['value'],
  methods: {
    onInput(v) {
      this.$emit('input', v);
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

    .json-flex {
      display: flex;
    }

    .width-100 {
      width: 100px;
    }

    .flex-1 {
      flex: 1;
    }
  }
}
</style>
