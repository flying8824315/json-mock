<template>
  <div class="im-tag-input">
    <ElTag
      :key="idx"
      v-for="(tag,idx) in tags"
      :closable="closable"
      :size="tagSize"
      :disable-transitions="false"
      @close="onClose(tag,idx)">
      {{tag}}
    </ElTag>
    <div v-if="!viewonly">
      <ElInput
        :class="inputClass"
        :stype="inputStyle"
        v-model="inputVal"
        ref="saveTagInput"
        :size="size"
        :clearable="clearable"
        :placeholder="placeholder"
        @keyup.enter.native="onConfirm"
        @blur="onConfirm"
      ></ElInput>
    </div>
  </div>
</template>

<script>
  import {BaseMixin, TagInputProps} from './mixins';

  export default {
    name: 'TagInput',
    mixins: [TagInputProps, BaseMixin],
    computed: {
      isString() {
        return typeof this.value === 'string';
      },
      currentVal: {
        get({value, separator, isString}) {
          return isString ? value.split(separator) : (value || []);
        },
      },
      tagSize() {
        return this.tagSizeMap[this.size];
      },
    },
    data() {
      return {
        tags: [],
        inputVal: '',
        tagSizeMap: {
          small: 'medium',
          mini: 'small',
        },
      };
    },
    watch: {
      currentVal: {
        handler(now) {
          this.tags = now;
        },
        immediate: true,
      },
    },
    methods: {
      onClose(tag, idx) {
        this.tags.splice(idx, 1);
      },
      onConfirm() {
        let inputVal = this.inputVal;
        if (inputVal) {
          this.tags.push(inputVal);
        }
        this.inputVal = '';
        this.updateVal();
      },
      updateVal() {
        if (this.value !== undefined) {
          const {tags, isString, separator} = this;
          this.$emit('input', isString ? tags.join(separator) : tags);
        }
      },
    },
  };
</script>

<style scoped>
  .im-tag-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .im-tag-input > div {
    min-width: 100px;
    flex: 1;
  }

  .el-tag {
    margin-right: 10px;
  }
</style>
