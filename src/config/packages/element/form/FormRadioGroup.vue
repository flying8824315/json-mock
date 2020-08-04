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
    <ElRadioGroup
      v-else
      @change="onChange"
      :min="min"
      :max="max"
      :size="size"
      :fill="fill"
      :textColor="textColor"
      :disabled="disabled"
      v-model="cachedVal"
    >
      <ElRadio
        v-for="(option,idx) in options"
        :key="optionKey(option,idx)"
        :value="optionValue(option)"
        :label="optionLabel(option)"
        :disabled="optionDisabled(option)"
        :name="name"
      />
    </ElRadioGroup>
  </ElFormItem>
</template>

<script>
  import {OptionsMixin} from './mixins';

  export const FormRadioGroup = {
    name: 'FormRadioGroup',
    mixins: [OptionsMixin],
    props: {
      min: Number,
      max: Number,
      textColor: String,
      fill: String,
    },
    data() {
      return {
        cachedVal: null,
      };
    },
    watch: {
      value: {
        handler(now) {
          this.cachedVal = now || [];
        },
        immediate: true,
      },
      cachedVal(now) {
        this.$emit('input', now);
      },
    },
  };

  export default FormRadioGroup;
</script>

<style scoped>

</style>
