<template>
  <div class="flex-reverse">
    <ElInput v-model="thisVal" clearable
        placeholder="Property value"/>
    <div class="width-16"></div>
    <ElInput
        v-model="thisKey"
        @blur="onBlurProp"
        @clear="onBlurProp"
        clearable
        placeholder="Property name"
        class="width-240"/>
  </div>
</template>

<script>
export default {
  name: 'KeyValueEditor',
  props: {
    data: Object,
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
      const {data, thisKey} = this, {key} = data;
      if (key !== thisKey) {
        if (!thisKey) {
          this.$emit('remove');
        } else {
          this.data.key = thisKey;
        }
      }
    },
  },
  watch: {
    data: {
      handler({key, value, type}) {
        this.thisKey = key;
        this.thisVal = value;
        this.thisValueType = type;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>

</style>