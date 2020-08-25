<template>
  <div class="json-flex relative">
    <ElInput
        v-if="editingPair"
        v-model="pair.key"
        @focus="onFocus"
        @blur="onBlur"/>
    <div v-else>"{{ pair.key }}":</div>
    <JsonProperty
        :value="pair.value"
        :editing="editingPair"
        @input="onInputVal"
        @onFold="onFold"/>
    <div class="json-pair-op">
      <ElTag size="mini" type="info"><ElIcon name="edit"></ElIcon></ElTag>
      <ElTag size="mini" type="info"><ElIcon name="remove-outline"></ElIcon></ElTag>
    </div>
  </div>
</template>

<script>
import JsonCollapse from './JsonCollapse';
// import JsonObjectAddr from './JsonObjectAddr';
import {FoldMixin, provideKey} from './util';

export default {
  name: 'JsonObjectPair',
  mixins: [FoldMixin],
  components: {
    JsonCollapse,
    JsonProperty: () => import('./JsonProperty'),
  },
  props: {
    pair: Object,
    index: Number,
  },
  data() {
    return {
      focusedKey: '',
      editingPair: false,
      editingAddr: false,
    };
  },
  methods: {
    onFocus() {
      this.focusedKey = this.pair.key;
    },
    onBlur() {
      this.$emit('onInputKey', this.pair, this.focusedKey);
    },
    onPropertyAdd(pair) {
      console.log(pair);
      this.editingAddr = false;
    },
    onInputVal(value) {
      this.$emit('onInputVal', value, this.pair);
    },
  },
};
</script>

<style scoped>

</style>
