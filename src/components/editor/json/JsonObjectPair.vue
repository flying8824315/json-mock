<template>
  <div class="json-flex">
    <div class="width-200">
      <ElInput :value="pair.key" placeholder="Property name" clearable/>
    </div>
    <div class="width-14 json-colon">:</div>
    <JsonProperty class="flex-1" :value="pair.value" @input="onInputVal"/>
  </div>
</template>

<script>
export default {
  name: 'JsonObjectPair',
  components: {
    JsonProperty: () => import('./JsonProperty'),
  },
  props: {
    pair: Object,
    index: Number,
  },
  methods: {
    onInputVal(value) {
      this.$emit('onInputVal', value, this.pair);
    },
  },
};
</script>

<style scoped>

</style>
