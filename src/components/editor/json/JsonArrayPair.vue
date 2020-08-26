<template>
  <div>
    <div class="json-flex json-pair">
      <div class="json-idx">{{ index }}:</div>
      <JsonProperty
          :value="value"
          :editing="editing"
          @onEditing="onEditing"
          @input="onInputVal"
          @onFold="onFold"/>
      <JsonObjectCtrl
          :editing="editing"
          @onEditing="onEditing"
          @onConfirmEditing="onConfirmEditing"
          @onCancelEditing="onCancelEditing"
          @onDelete="$emit('onDelete', index)"
          @onAdding="onAdding"/>
    </div>
    <JsonCollapse
        :fold="folded"
        :value="value"
        :type="valueTypeOf"
        @input="onInputVal"/>
    <JsonArrayAddr
        :adding="adding"
        @onConfirmAdd="onConfirmAdd"
        @onCancelAdd="onCancelAdd"/>
  </div>
</template>

<script>
import JsonArrayAddr from './JsonArrayAddr';
import JsonObjectCtrl from './JsonObjectCtrl';
import {FoldMixin, typeOf} from './util';

export default {
  name: 'JsonArrayPair',
  mixins: [FoldMixin],
  components: {
    JsonObjectCtrl, JsonArrayAddr,
    JsonCollapse: () => import('./JsonCollapse'),
    JsonProperty: () => import('./JsonProperty'),
  },
  props: {
    value: {},
    index: Number,
  },
  data() {
    return {
      editing: false,
      adding: false,
    };
  },
  computed: {
    valueTypeOf() {
      return typeOf(this.value);
    },
  },
  methods: {
    onAdding() {
      this.adding = true;
    },
    onConfirmAdd(value) {
      this.$emit('onArrayAdd', value, this.index);
      this.adding = false;
    },
    onCancelAdd() {
      this.adding = false;
    },
    onEditing() {
      this.editing = true;
    },
    onConfirmEditing() {
      this.editing = false;
    },
    onCancelEditing() {
      this.editing = false;
    },
    onInputVal(v) {
      this.$emit('onInputVal', v, this.index);
    },
  },
};
</script>

<style scoped>
.json-idx {
  color: #999;
}
</style>
