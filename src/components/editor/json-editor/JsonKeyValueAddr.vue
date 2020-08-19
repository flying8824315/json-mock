<template>
  <div class="margin-top-5 relative json-object-pair">
    <div class="flex">
      <ElInput class="width-240" v-model="keyValue.key" clearable></ElInput>
      <div class="width-14 json-colon">:</div>
      <div class="flex-reverse flex-1">
        <div class="flex-1 flex">
          <JsonValue v-if="isNotObjOrArr" :pair="keyValue"></JsonValue>
          <div class="flex-1" v-else></div>
          <div>
            <ElButton @click="onConfirm" type="primary" icon="el-icon-check"></ElButton>
          </div>
          <ElButton @click="onCancel" icon="el-icon-close"></ElButton>
        </div>
        <ElSelect v-model="keyValue.type" class="width-120">
          <ElOption v-for="type in types" :key="type" :label="type" :value="type"></ElOption>
        </ElSelect>
      </div>
    </div>
  </div>
</template>

<script>
import JsonValue from '@/components/editor/json-editor/JsonValue';

function defaultKeyVal() {
  return {available: true, key: '', value: '', type: 'String'};
}

export default {
  name: 'JsonKeyValueAddr',
  components: {JsonValue},
  data() {
    return {
      keyValue: defaultKeyVal(),
      types: [
        'Null',
        'Array',
        'Object',
        'Number',
        'String',
        'Boolean',
      ],
    };
  },
  computed:{
    isNotObjOrArr(){
      const {keyValue: {type}} = this;
      return type !== 'Array' && type !== 'Object';
    }
  },
  methods: {
    onConfirm() {
      const {keyValue: kv} = this;
      const {key, type} = kv;
      kv.key = `${key}`;
      switch (type) {
        case 'Object':
          kv.value = {};
          break;
        case 'Array':
          kv.value = [];
          break;
        case 'Null':
          kv.value = null;
          break;
      }
      this.$emit('onConfirmAdd', kv);
    },
    onCancel() {
      this.keyValue = defaultKeyVal();
      this.$emit('onCancel');
    },
  },
};
</script>

<style scoped>

</style>
