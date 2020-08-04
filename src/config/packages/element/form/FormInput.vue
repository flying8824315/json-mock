<template>
  <ElFormItem
    :label="labelVal"
    :prop="prop"
    :rules="rules"
    :required="required"
    :labelWidth="labelWidth"
    :class="{'im-clear-gaps':clearGaps}"
  >
    <template v-if="$slots.label" #label>
      <slot name="label"/>
    </template>
    <div
      class="text-justify-last"
      v-else-if="labelJustify"
      slot="label">
      {{label}}
    </div>
    <slot>
      <span
        v-if="viewonly"
        style="padding: 0 15px;"
      >
      {{currentVal}}
    </span>
      <ElInput
        v-else
        v-model="currentVal"
        @blur="onBlur"
        @focus="onFocus"
        @change="onChange"
        :size="size"
        :type="type"
        :suffixIcon="suffixIcon"
        :class="inputClass"
        :style="inputStyle"
        :autosize="autosize"
        :disabled="disabled"
        :clearable="clearable"
        :placeholder="currentPlaceholder"
      >
        <template v-if="$slots.prefix" slot="prefix">
          <slot name="prefix"></slot>
        </template>
        <template v-if="$slots.suffix" slot="suffix">
          <slot name="suffix"></slot>
        </template>
        <template v-if="$slots.prepend" slot="prepend">
          <slot name="prepend"></slot>
        </template>
        <template v-if="$slots.append" slot="append">
          <slot name="append"></slot>
        </template>
      </ElInput>
    </slot>
  </ElFormItem>
</template>

<script>
  import {BaseMixin} from './mixins';

  export default {
    name: 'FormInput',
    mixins: [BaseMixin],
    props: {
      inputClass: [String, Array, Object],
      inputStyle: [String, Array, Object],
      autosize: [Object, Boolean],
      type: String,
      suffixIcon: String,
    },
  };
</script>

<style scoped>

</style>
