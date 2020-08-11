<template>
  <div class="flex">
    <div v-if="hasRestFul" class="flex-1">
      <h4>RESTful Params</h4>
      <div></div>
    </div>
    <div class="flex-1">
      <h4>Search Params</h4>
      <div></div>
    </div>
    <div class="flex-1">
      <h4>Body</h4>
      <div></div>
    </div>
  </div>
</template>

<script>
function hasProperties(obj){
  return obj&&Object.keys(obj).length
}
export default {
  name: 'RequestParams',
  props: {
    value: {
      type: Object,
      default() {
        return {
          restful: {},
          search: {},
          body: {},
        };
      },
    },
  },
  computed:{
    hasRestFul(){
      return hasProperties(this.value.restful);
    }
  },
};
</script>

<style scoped>
.width-one-third {
  width: 33.33%;
}
</style>