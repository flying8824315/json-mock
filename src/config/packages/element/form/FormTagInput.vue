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
    <TagInput
      v-model="currentVal"
      :inputClass="inputClass"
      :inputStyle="inputStyle"
      :separator="separator"
      :clearable="clearable"
      :closable="closable"
      :viewonly="viewonly"
      :size="size"
      :placeholder="currentPlaceholder"
    >
      <template v-if="$slots.add" slot="add">
        <slot name="add"/>
      </template>
    </TagInput>
  </ElFormItem>
</template>

<script>
  import {BaseMixin, TagInputProps} from './mixins';

  export default {
    name: 'FormTagInput',
    mixins: [BaseMixin, TagInputProps],
  };
</script>

<style scoped>

</style>
