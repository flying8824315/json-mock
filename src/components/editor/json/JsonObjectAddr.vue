<template>
  <div class="json-flex">
    <ElInput class="width-200" v-model="pair.key" clearable placeholder="Property name"/>
    <div class="width-14 json-colon">:</div>
    <JsonProperty class="flex-1" v-model="pair.value"/>
  </div>
</template>

<script>

function defaultKeyVal() {
  return {available: true, key: '', value: '', type: 'String'};
}

export default {
  name: 'JsonObjectAddr',
  components: {
    JsonProperty: () => import('./JsonProperty'),
  },
  data() {
    return {
      pair: defaultKeyVal(),
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
