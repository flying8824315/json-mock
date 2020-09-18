<template>
  <div class="json-editor">
    <JsonProperty
        :editing="true"
        :value="value"
        @input="onInput"
        @onFold="onFold"/>
    <JsonCollapse
        :value="value"
        :fold="folded"
        :type="valueType"/>
  </div>
</template>

<script>
import JsonProperty from './JsonProperty';
import JsonCollapse from './JsonCollapse';
import {FoldMixin, provideKey, typeOf} from './util';

export default {
  name: 'JsonEditor',
  mixins: [FoldMixin],
  components: {JsonProperty, JsonCollapse},
  props: ['value'],
  data() {
    return {
      settings: {
        keyWidth: '100px',
      },
    };
  },
  computed: {
    valueType() {
      return typeOf(this.value);
    },
  },
  methods: {
    onInput(v) {
      this.$emit('input', v);
    },
  },
  provide() {
    console.log(this);
    return {
      [provideKey]: this.settings,
    };
  },
};
</script>

<style scoped lang="scss">
.json-editor {
  font-family: 'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace;

  ::v-deep {

    .el-button.is-circle {
      border-radius: 3px;
    }

    .relative {
      position: relative;
    }

    .absolute {
      position: absolute;
    }

    .json-pair-op {
      position: sticky;
      display: none;
      top: 0;
      right: -100%;
      width: 50px;
      cursor: pointer;
    }

    .json-pair:hover .json-pair-op {
      display: block;
    }

    .pl-10 {
      padding-left: 10px;
    }

    .json-colon {
      font-size: 14px;
      text-align: center;
      line-height: 2;
    }

    .json-flex {
      display: flex;
    }

    .json-inline-flex {
      display: inline-flex;
    }

    .flex-1 {
      flex: 1;
    }

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flex-v-center {
      display: flex;
      align-items: center;
    }

    .w-full {
      width: 100%;
    }

    .w-100 {
      width: 100px;
    }

    .w-140 {
      width: 140px;
    }

    .mouse-pointer {
      cursor: pointer;
    }

    .json-collapse-body {
      position: relative;
      padding-left: 24px;

      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 100%;
        width: 0;
        border-left: 1px solid #333;
        top: 0;
        left: 10px;
      }

      & > div > div {
        &:first-child {
          margin-top: 10px;
        }

        &:last-child {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
