<template>
  <div class="json-collapse-body">
    <ElCollapseTransition v-if="type==='Object'">
      <JsonObject v-if="!fold" :value="value" @input="onInput"/>
    </ElCollapseTransition>
    <ElCollapseTransition v-if="type==='Array'">
      <JsonArray v-if="!fold" :value="value" @input="onInput"/>
    </ElCollapseTransition>
  </div>
</template>

<script>
export default {
  name: 'JsonCollapse',
  components: {
    JsonObject: () => import('./JsonObject'),
    JsonArray: () => import('./JsonArray'),
  },
  props: {
    type: String,
    fold: {
      type: Boolean,
      default: true,
    },
    value: {default: undefined},
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
