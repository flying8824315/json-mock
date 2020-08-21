<template>
  <div>
    <div v-if="editingPair" class="json-flex json-pair">
      <div :style="keyStyle">
        <ElInput
            v-model="pair.key"
            @focus="onFocus"
            @blur="onBlur"
            placeholder="Property name"
            clearable/>
      </div>
      <div class="width-14 json-colon">:</div>
      <JsonProperty
          class="flex-1"
          :value="pair.value"
          @input="onInputVal"
          @onFold="onFold"/>
      <div v-if="pair.type==='Object'||pair.type==='Array'">
        <ElButton
            @click="onInputVal({})"
            icon="el-icon-delete"
            circle/>
      </div>
      <ElButton
          @click="$emit('onDelete',pair,index)"
          icon="el-icon-remove-outline"
          circle/>
    </div>
    <div  class="json-flex json-pair">
      <div :style="keyStyle">
        {{pair.key}}
      </div>
      <div class="width-14 json-colon">:</div>
    </div>
    <JsonCollapse
        :fold="folded"
        :value="pair.value"
        :type="pair.type"
        @input="onInputVal"/>
    <ElCollapseTransition>
      <JsonObjectAddr
          v-if="editingAddr"
          @onPropertyAdd="onPropertyAdd"
          @onCancelAdd="editingAddr=false"/>
    </ElCollapseTransition>
    <button
        v-if="!editingAddr"
        @click="editingAddr=true"
        class="json-add">
      <ElIcon name="plus"/>
    </button>
  </div>
</template>

<script>
import JsonCollapse from './JsonCollapse';
import JsonObjectAddr from './JsonObjectAddr';
import {FoldMixin, provideKey} from './util';

export default {
  name: 'JsonObjectPair',
  mixins: [FoldMixin],
  components: {
    JsonProperty: () => import('./JsonProperty'),
    JsonCollapse, JsonObjectAddr,
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
  computed: {
    keyStyle() {
      const {[provideKey]: {keyWidth} = {}} = this;
      return {width: keyWidth || '100px'};
    },
  },
  inject: {
    [provideKey]: {
      default() {
        return {
          keyWidth: 100,
        };
      },
    },
  },
};
</script>

<style scoped>

</style>
