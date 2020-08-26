<template>
  <div class="json-editor">
    <div class="json-flex">
      <JsonProperty
          class="lh-20"
          :editing="editing"
          :value="value"
          @input="onInput"
          @onFold="onFold"/>
      <div class="flex-v-center root-edit">
        <ElTag v-if="editing" @click="editing=false" size="undefined">
          <ElIcon name="check"/>
        </ElTag>
        <ElTag v-else @click="editing=true" :size="sizeOfRootTag">
          <ElIcon name="edit"/>
        </ElTag>
        <ElTag v-if="value!==null" :size="sizeOfRootTag" @click="onInput(null)">
          <ElIcon name="remove-outline"/>
        </ElTag>
      </div>
    </div>
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
      editing: false,
      settings: {
        keyWidth: '100px',
      },
    };
  },
  computed: {
    valueType() {
      return typeOf(this.value);
    },
    sizeOfRootTag() {
      return this.editing ? 'undefined' : 'mini';
    },
  },
  methods: {
    onInput(v) {
      this.$emit('input', v);
    },
  },
  provide() {
    return {
      [provideKey]: this.settings,
    };
  },
};
</script>

<style scoped lang="scss">
.json-editor {
  font-family: 'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace;

  .lh-20 {
    line-height: 20px;
  }

  .root-edit {
    cursor: pointer;
  }

  ::v-deep {

    .el-button-group > button.el-button.is-circle {
      border-radius: 3px;
    }

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
      width: 75px;
      cursor: pointer;
    }

    .json-pair:hover {
      background: #fafafa;

      & .json-pair-op {
        display: block;
      }
    }

    .json-unit {
      padding: 0 5px;
      border-radius: 3px;

      &:hover {
        background: #ddd;
      }
    }

    .pl-10 {
      padding-left: 10px;
    }

    .ml-20 {
      margin-left: 20px;
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
        left: 18px;
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
