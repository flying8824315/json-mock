<template>
  <div class="relative ">
    <div class="json-pair" :class="editingPair?'json-flex':'json-inline-flex'">
      <ElInput
          style="max-width: 250px;"
          v-if="editingPair"
          v-model="pair.key"
          @focus="onFocus"
          @blur="onBlur"/>
      <div v-else>"{{ pair.key }}":</div>
      <JsonProperty
          class="flex-1"
          :value="pair.value"
          :editing="editingPair"
          @input="onInputVal"
          @onFold="onFold"/>
      <ElButtonGroup v-if="editingPair">
        <ElButton @click="onConfirmEditing" icon="el-icon-check" type="primary" circle/>
        <ElButton @click="onCancelEditing" icon="el-icon-close" circle/>
      </ElButtonGroup>
      <div v-else class="json-pair-op">
        <ElTag @click="onEditing" size="mini" type="info">
          <ElIcon name="edit"></ElIcon>
        </ElTag>
        <ElTag size="mini" type="info">
          <ElIcon name="remove-outline"></ElIcon>
        </ElTag>
      </div>
    </div>
  </div>
</template>

<script>
import JsonCollapse from './JsonCollapse';
// import JsonObjectAddr from './JsonObjectAddr';
import {FoldMixin, provideKey, overrideObject} from './util';

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
