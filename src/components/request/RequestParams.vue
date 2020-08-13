<template>
  <ElForm label-width="100px">
    <div class="flex">
      <RequestArg
          v-if="hasRestFul"
          class="width-half"
          label="Restful Params"
          :params="value.hrefPath"/>
      <RequestArg
          :class="{'keep-width-full':!hasRestFul}"
          class="width-half"
          label="Search Params"
          :params="value.hrefQuery"/>
    </div>
  </ElForm>
</template>

<script>
import RequestArg from '@/components/request/RequestArg';
function hasProperties(obj) {
  return obj && Object.keys(obj).length;
}

export default {
  name: 'RequestParams',
  components:{RequestArg},
  props: {
    value: {
      type: Object,
      default() {
        return {
          hrefPath: [],
          search: [],
        };
      },
    },
  },
  computed: {
    hasRestFul() {
      return hasProperties(this.value.hrefPath);
    },
  },
};
</script>

<style scoped>
.width-one-third {
  width: 33.33%;
}
</style>