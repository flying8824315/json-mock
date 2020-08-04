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
    <span
      v-if="viewonly"
      style="padding: 0 15px;"
    >
      {{activeLabel}}
    </span>
    <ElSelect
      v-else
      v-model="currentVal"
      class="width-full"
      :class="selectClass"
      :style="selectStyle"
      :disabled="disabled"
      :multiple="multiple"
      :clearable="clearable"
      :multipleLimit="multipleLimit"
      :allowCreate="allowCreate"
      :filterable="filterable||allowCreate"
      :placeholder="currentPlaceholder"
    >
      <ElOption
        v-for="(option,idx) in options"
        :key="optionKey(option,idx)"
        :value="optionValue(option)"
        :label="optionLabel(option)"
        :disabled="optionDisabled(option)"
        :class="optionClass"
        :style="optionStyle"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script>
  import {OptionsMixin} from './mixins';

  const types = [String, Object, Array];
  export default {
    name: 'FormSelect',
    mixins: [ OptionsMixin],
    props: {
      selectClass: types,
      selectStyle: types,
      optionClass: types,
      optionStyle: types,
      placeholder: {
        type: String,
        default: '- 请选择 -',
      },
      multipleLimit: Number,
      multiple: Boolean,
      allowCreate: Boolean,
      filterable: Boolean,
      defaultFirstOption: Boolean,
    },
  };
</script>

<style scoped>

</style>
