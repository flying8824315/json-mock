<template>
  <div class="flex-reverse">
    <ElInput v-model="thisVal" clearable
        placeholder="Property value"/>
    <div class="width-16"></div>
    <ElInput v-model="thisKey" @blur="onBlurProp"
        clearable placeholder="Property name"
        class="width-240"/>
  </div>
</template>

<script>
export default {
  name: 'KeyValueAddr',
  props: {
    origin: Object,
  },
  data() {
    return {
      thisKey: null,
      thisVal: null,
      thisValueType: null,
    };
  },
  methods: {
    onBlurProp() {
      if (this.thisKey) {
        const {origin, thisKey, thisVal} = this;
        this.$set(origin, thisKey, thisVal);
        this.thisKey = null;
        this.thisVal = null;
      }
    },
  },
};
</script>

<style scoped>

</style>