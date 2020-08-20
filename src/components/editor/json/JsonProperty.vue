<template>
  <div>
    <div class="json-flex">
      <ElSelect v-model="dataType" class="width-100">
        <ElOption v-for="type in typesArr" :key="type" :label="type" :value="type"/>
      </ElSelect>
      <div class="flex-1">
        <JsonValue
            v-model="targetVal"
            :type="dataType"
            @onFold="onFold"/>
      </div>
    </div>
    <ElCollapseTransition>
      <JsonObject v-if="isObj" :value="value"/>
    </ElCollapseTransition>
    <ElCollapseTransition>
      <JsonArray v-if="isArr" :value="value"/>
    </ElCollapseTransition>
  </div>
</template>

<script>
import {dataTypes, typeOf} from './util';
import JsonValue from './JsonValue';
import JsonArray from './JsonArray';
import JsonObject from './JsonObject';

export default {
  name: 'JsonProperty',
  components: {JsonValue, JsonArray, JsonObject},
  props: ['value'],
  watch: {
    value: {
      handler(now) {
        if (now === undefined) {
          this.$emit('input', null);
        } else {
          this.targetVal = now;
          this.dataType = typeOf(now);
        }
      },
      immediate: true,
    },
    targetVal(now, old) {
      if (now !== old) {
        this.$emit('input', now);
      }
    },
    isObj(now) {
      console.log('isObj: ', now);
    },
    isArr(now) {
      console.log('isArr: ', now);
    },
  },
  data() {
    return {
      targetVal: null,
      dataType: 'String',
      folded: true,
    };
  },
  computed: {
    typesArr: () => [...dataTypes],
    isObj({dataType, folded}) {
      return dataType === 'Object' && !folded;
    },
    isArr({dataType, folded}) {
      return dataType === 'Array' && !folded;
    },
  },
  methods: {
    onFold(fold) {
      this.folded = fold;
    },
  },
};
</script>

<style scoped>

</style>
