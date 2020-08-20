<template>
  <div class="json-flex">
    <div></div>
    <JsonProperty/>
  </div>
</template>

<script>
export default {
  name: 'JsonArrayAddr',
  components: {
    JsonProperty: () => import('./JsonProperty'),
  },
};
</script>

<style scoped>

</style>
