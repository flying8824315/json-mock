<template>
  <div v-show="param.available" class="flex">
    <FormInput
        class="flex-1" v-model="param.value"
        :placeholder="param.prop?(param.prop+' value'):'value'">
      <ParamArgLabel slot="label" :param="param"/>
    </FormInput>
    <ParamArgControl :param="param"/>
  </div>
</template>

<script>
import ParamArgLabel from '@/components/request/ParamArgLabel';
import ParamArgControl from '@/components/request/ParamArgControl';

export default {
  name: 'ParamArgEntity',
  components: {ParamArgLabel, ParamArgControl},
  props: {param: Object},
  methods: {
    onInputValue(value) {
      this.param.value = value;
    },
  },
};
</script>

<style scoped>

</style>
