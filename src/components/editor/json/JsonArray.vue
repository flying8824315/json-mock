<template>
  <div>
    <JsonArrayPair
        v-for="(item,idx) in value"
        :key="idx"
        :index="idx"
        :value="item"
        @onDelete="onDelete"
        @onArrayAdd="onArrayAdd"
        @onInputVal="onInputVal"/>
    <JsonArrayAddr
        hideCancel
        :adding="!(value&&value.length)"
        @onConfirmAdd="onArrayAdd"/>
  </div>
</template>

<script>
import JsonArrayAddr from './JsonArrayAddr';
import JsonArrayPair from './JsonArrayPair';

export default {
  name: 'JsonArray',
  components: {JsonArrayPair,JsonArrayAddr},
  props: ['value'],
  methods: {
    onDelete(idx) {
      this.value.splice(idx, 1);
    },
    onInputVal(v, idx) {
      this.value[idx] = v;
    },
    onArrayAdd(v, idx) {
      this.value.splice(idx + 1, 0, v);
    },
  },
};
</script>

<style scoped>

</style>
