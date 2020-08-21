<template>
  <div class="json-flex json-pair json-pair-add">
    <ElInput
        :style="keyStyle"
        v-model="pair.key"
        clearable
        placeholder="Property name"/>
    <div class="width-14 json-colon">:</div>
    <JsonProperty class="flex-1" v-model="pair.value"/>
    <div>
      <ElButton @click="onPropertyAdd" circle icon="el-icon-check" type="primary"/>
    </div>
    <ElButton @click="onCancelAdd" circle icon="el-icon-close"/>
  </div>
</template>

<script>

import {provideKey} from '@/components/editor/json/util';

function defaultKeyVal() {
  return {available: true, key: '', value: '', type: 'String'};
}

export default {
  name: 'JsonObjectAddr',
  components: {
    JsonProperty: () => import('./JsonProperty'),
  },
  data() {
    return {
      pair: defaultKeyVal(),
    };
  },
  methods: {
    onPropertyAdd() {
      this.$emit('onPropertyAdd', this.pair);
    },
    onCancelAdd() {
      this.pair = defaultKeyVal();
      this.$emit('onCancelAdd');
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
