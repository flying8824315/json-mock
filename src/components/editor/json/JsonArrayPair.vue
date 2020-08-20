<template>
  <div class="json-flex">
    <div>{{ index }}</div>
    <JsonProperty :value="value" @onInputVal="onInputVal"/>
  </div>
</template>

<script>
export default {
  name: 'JsonArrayPair',
  components: {
    JsonProperty: () => import('./JsonProperty'),
  },
  props: {
    value: {default: undefined},
    index: Number,
  },
  methods: {
    onInputVal() {
    },
  },
};
</script>

<style scoped>

</style>
