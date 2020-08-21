<template>
  <div class="json-editor">
    <JsonProperty
        :value="value"
        @input="onInput"
        @onFold="onFold"/>
    <JsonCollapse :value="value" :fold="folded" :type="valueType"/>
  </div>
</template>

<script>
import JsonCollapse from './JsonCollapse';
import JsonProperty from './JsonProperty';
import {FoldMixin, provideKey, typeOf} from './util';

export default {
  name: 'JsonEditor',
  mixins: [FoldMixin],
  components: {JsonCollapse, JsonProperty},
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

    .json-arr-idx {
      width: 30px;
      border: 1px solid #DCDFE6;
      border-radius: 3px;
    }

    .json-pair-add {
      margin: 10px 0;
    }

    .json-add {
      width: 100%;
      background: #EFEFEF;
      border-color: transparent;
      outline: none;
      cursor: pointer;
      transition-duration: .3s;

      &:hover, &:focus {
        background: darken(#EFEFEF, 12);
      }

      &:active {
        background: darken(#EFEFEF, 6);
      }
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

    .json-pair {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        display: block;
        height: 1px;
        top: 50%;
        width: 10px;
        left: -14px;
        background: #000;
      }
    }
  }
}
</style>
