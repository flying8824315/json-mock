<template>
  <div class="json-editor">
    <JsonObject v-if="typeOf==='Object'" :data="data" @input="onInput"></JsonObject>
    <JsonObject v-if="typeOf==='Array'" :data="data" @input="onInput"></JsonObject>
  </div>
</template>

<script>
import JsonObject from '@/components/editor/json-editor/JsonObject';
import JsonArray from '@/components/editor/json-editor/JsonArray';
import {typeOf} from '@/components/editor/json-editor/util';

export default {
  name: 'JsonFormEditor',
  components: {JsonObject, JsonArray},
  model: {
    prop: 'data',
  },
  props: {
    data: [Object, Array],
  },
  computed: {
    typeOf() {
      return typeOf(this.data);
    },
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

    .json-object-pair {
      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1px;
        background: #111;
        width: 8px;
        left: -10px;
        top: 50%;
      }
    }
  }
}
</style>
