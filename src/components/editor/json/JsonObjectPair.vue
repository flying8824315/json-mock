<template>
  <div class="relative">
    <div class="json-pair json-flex">
      <JsonObjectKey
          v-model="pair.key"
          :editing="editingPair"
          @onEditing="onEditing"
          @focus="onFocus"
          @blur="onBlur"/>
      <JsonProperty
          :value="pair.value"
          :editing="editingPair"
          @onEditing="onEditing"
          @input="onInputVal"
          @onFold="onFold"/>
      <JsonObjectCtrl
          :editing="editingPair"
          @onEditing="onEditing"
          @onConfirmEditing="onConfirmEditing"
          @onCancelEditing="onCancelEditing"
          @onDelete="$emit('onDelete', pair, index)"
          @onAdding="onAdding"/>
    </div>
    <JsonCollapse
        :fold="folded"
        :value="pair.value"
        :type="pair.type"
        @input="onInputVal"/>
    <JsonObjectAddr
        :adding="editingAddr"
        @onConfirmAdd="onConfirmAdd"
        @onCancelAdd="onCancelAdd"/>
  </div>
</template>

<script>
import JsonObjectKey from './JsonObjectKey';
import JsonObjectCtrl from './JsonObjectCtrl';
import JsonObjectAddr from './JsonObjectAddr';
import {FoldMixin} from './util';

export default {
  name: 'JsonObjectPair',
  mixins: [FoldMixin],
  components: {
    JsonObjectKey, JsonObjectCtrl, JsonObjectAddr,
    JsonCollapse: () => import('./JsonCollapse'),
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
    onAdding() {
      this.editingAddr = true;
    },
    onConfirmAdd(pair) {
      this.$emit('onObjectAdd', pair, this.index);
      this.editingAddr = false;
    },
    onCancelAdd() {
      this.editingAddr = false;
    },
    onEditing() {
      this.editingPair = true;
    },
    onConfirmEditing() {
      this.editingPair = false;
    },
    onCancelEditing() {
      this.editingPair = false;
    },
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
