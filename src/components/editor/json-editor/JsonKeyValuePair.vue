<template>
  <div class="margin-top-20 relative">
    <div class="flex">
      <ElInput class="width-240" v-model="keyValuePair.key" clearable></ElInput>
      <div class="width-16 json-colon">:</div>
      <div class="flex-reverse flex-1">
        <div class="flex-1 flex">
          <JsonValue
              :pair="keyValuePair"
              @onUnfold="onUnfold"
              @onChangeVal="onChangeVal"></JsonValue>
          <ElButton
              @click="$emit('onDelete', keyValuePair, index)"
              icon="el-icon-delete"/>
        </div>
        <ElSelect v-model="keyValuePair.type" class="width-120">
          <ElOption v-for="type in types" :key="type" :label="type" :value="type"></ElOption>
        </ElSelect>
      </div>
    </div>
    <div v-if="isObjectOrArray" class="padding-left-30">
      <ElCollapseTransition>
        <JsonObject v-if="unfolded" v-model="keyValuePair.value"/>
      </ElCollapseTransition>
    </div>
    <button v-if="!editingAddr"
        @click="editingAddr=true"
        class="flex-center absolute width-full key-value-plus">
      <ElIcon name="plus"></ElIcon>
    </button>
    <ElCollapseTransition>
      <JsonKeyValueAddr
          v-if="editingAddr"
          @onConfirmAdd="onConfirmAdd"
          @onCancel="editingAddr=false"/>
    </ElCollapseTransition>
  </div>
</template>

<script>
import JsonKeyValueAddr from '@/components/editor/json-editor/JsonKeyValueAddr';
import JsonValue from '@/components/editor/json-editor/JsonValue';

export default {
  name: 'JsonKeyValuePair',
  components: {
    JsonValue, JsonKeyValueAddr,
    JsonObject: () => import('@/components/editor/json-editor/JsonObject'),
  },
  props: {
    keyValuePair: Object,
    theLast: Boolean,
    index: Number,
  },
  data() {
    return {
      types: [
        'Null',
        'Array',
        'Object',
        'Number',
        'String',
        'Boolean',
      ],

      editingAddr: false,
      unfolded: false,
    };
  },
  computed: {
    isObjectOrArray({keyValuePair: {type}}) {
      return type === 'Array' || type === 'Object';
    },
  },
  methods: {
    onUnfold() {
      this.unfolded = !this.unfolded;
      // console.log('====');
    },
    onChangeVal(key, value) {
      this.$emit('onChangeVal', key, value);
    },
    onConfirmAdd(pair) {
      this.$emit('onConfirmAdd', pair, this.index + 1);
      this.$nextTick(() => {
        this.editingAddr = false;
      });
    },
  },
  created() {
    // this.$watch(() => this.keyValuePair.type, type => {
    //   console.log(type);
    //   setTimeout(() => {
    //     console.log(this.keyValuePair);
    //   });
    // });
  },
};
</script>
<style>
.json-number-value-align-left .el-input__inner {
  text-align: left;
}
</style>
<style scoped lang="scss">
.key-value-plus {
  padding: 1px 0;
  background: #fafafa;
  color: #333;
  transition-duration: .3s;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
  border: none;

  &:hover {
    background: #999;
    color: #fff;
  }

  &:active, &:focus {
    background: #888;
    color: #fff;
  }
}
</style>
