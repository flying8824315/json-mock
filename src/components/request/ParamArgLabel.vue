<template>
<span class="flex">
  <ElCheckbox
      v-if="!param.required"
      v-model="param.enable"
      class="width-24 align-left"/>
  <div class="flex-1 align-right" v-if="param.preParsed">
    <span v-if="param.required" class="color-danger margin-right-5">*</span>
    <span>{{ param.prop }}：</span>
  </div>
  <ElInput
      v-else
      v-model="param.prop"
      class="flex-1"
      placeholder="name"
      @click.native.prevent
      clearable/>
</span>
</template>

<script>
export default {
  name: 'ParamArgLabel',
  props: {param: Object},
};
</script>

<style scoped>

</style>
