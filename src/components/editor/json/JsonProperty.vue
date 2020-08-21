<template>
  <div>
    <div class="json-flex">
      <ElSelect v-model="dataType" class="w-100">
        <ElOption v-for="type in typesArr" :key="type" :label="type" :value="type"/>
      </ElSelect>
      <div class="flex-1 flex-v-center pl-10 w-140">
        <JsonValue
            v-model="targetVal"
            :type="dataType"
            @onFold="onFold"/>
      </div>
    </div>
  </div>
</template>

<script>
import {dataTypes, typeOf, FoldMixin} from './util';
import JsonValue from './JsonValue';

export default {
  name: 'JsonProperty',
  components: {JsonValue},
  mixins: [FoldMixin],
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
    dataType(now) {
      this.$emit('onChangeValType', now);
    },
  },
  data() {
    return {
      targetVal: null,
      dataType: 'String',
    };
  },
  computed: {
    typesArr: () => [...dataTypes],
  },
};
</script>

<style scoped>

</style>
