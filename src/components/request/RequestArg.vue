<template>
  <div v-show="param.available" class="flex">
    <FormInput
        class="flex-1" v-model="param.value"
        :placeholder="param.prop?(param.prop+' value'):'value'">
      <RequestArgLabel slot="label" :param="param"/>
    </FormInput>
    <RequestArgControl :param="param"/>
  </div>
</template>

<script>
import RequestArgLabel from '@/components/request/RequestArgLabel';
import RequestArgControl from '@/components/request/RequestArgControl';

export default {
  name: 'RequestArg',
  components: {RequestArgLabel, RequestArgControl},
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