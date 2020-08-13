<template>
  <div class="border-box">
    <h4>{{ label }}</h4>
    <div>
      <FormInput v-for="(param,index) in params"
          v-model="param.value"
          :label="param.prop"
          :key="index"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestArg',
  props: {
    label: String,
    params: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>