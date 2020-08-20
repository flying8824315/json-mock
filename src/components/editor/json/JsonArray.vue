<template>
  <div>
    <template v-if="value&&value.length">
      <JsonArrayPair
          v-for="(pair,idx) in value"
          :key="idx"
          :index="idx"
          :value="pair"
          @onInputVal="onInputVal"/>
    </template>
    <JsonArrayAddr v-else/>
  </div>
</template>

<script>
import JsonArrayPair from './JsonArrayPair';
import JsonArrayAddr from './JsonArrayAddr';

export default {
  name: 'JsonArray',
  components: {JsonArrayPair, JsonArrayAddr},
  props: ['value'],
  methods: {
    onInputVal(value, index) {
      this.value[index] = value;
    },
  },
};
</script>

<style scoped>

</style>
