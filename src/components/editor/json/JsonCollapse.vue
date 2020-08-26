<template>
  <div class="json-collapse-body" v-if="type==='Object'||type==='Array'">
    <ElCollapseTransition v-if="type==='Object'">
      <JsonObject v-if="!fold" :value="value" @input="onInput"/>
    </ElCollapseTransition>
    <ElCollapseTransition v-if="type==='Array'">
      <JsonArray v-if="!fold" :value="value" @input="onInput"/>
    </ElCollapseTransition>
  </div>
</template>

<script>
import JsonArray from './JsonArray';
import JsonObject from './JsonObject';

export default {
  name: 'JsonCollapse',
  components: {JsonArray, JsonObject},
  props: {
    value: {default: undefined},
    // value 的实际 type
    type: String,
    // 是否折叠
    fold: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onInput(v) {
      this.$emit('input', v);
    },
  },
};
</script>

<style scoped>

</style>
