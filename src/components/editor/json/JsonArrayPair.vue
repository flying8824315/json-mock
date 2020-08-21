<template>
  <div>
    <div class="json-flex json-pair">
      <div class="flex-center json-arr-idx">
        <span>{{ index }}.</span>
      </div>
      <JsonProperty
          class="w-full"
          :value="value"
          @onInputVal="onInputVal"
          @onFold="onFold"/>
      <div v-if="valueType==='Object'||valueType==='Array'">
        <ElButton @click="$emit('onClear')" circle icon="el-icon-delete"/>
      </div>
      <ElButton @click="$emit('onDelete',index)" circle icon="el-icon-remove-outline"/>
    </div>
    <JsonCollapse
        :type="valueType"
        :value="value"
        :fold="folded"/>
    <button class="json-add"><ElIcon name="plus"/></button>
  </div>
</template>

<script>
import JsonCollapse from './JsonCollapse';
import {FoldMixin, typeOf} from './util';

export default {
  name: 'JsonArrayPair',
  mixins: [FoldMixin],
  components: {
    JsonCollapse,
    JsonProperty: () => import('./JsonProperty'),
  },
  props: {
    value: {default: undefined},
    index: Number,
  },
  computed: {
    valueType() {
      return typeOf(this.value);
    },
  },
  methods: {
    onClear() {
      this.onInputVal([]);
    },
    onInputVal(value) {
      this.$emit('onInputVal', value, this.index);
    },
  },
};
</script>

<style scoped>

</style>
