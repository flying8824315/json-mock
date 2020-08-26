<template>
  <div v-if="adding" class="json-flex json-pair">
    <div class="json-idx flex-center">
      <span>N:</span>
    </div>
    <JsonProperty
        editing
        class="flex-1"
        v-model="arrValue"
        @onChangeValueType="onChangeType"/>
    <JsonObjectCtrl
        editing
        :hasCancel="!hideCancel"
        @onConfirmEditing="onConfirmAdd"
        @onCancelEditing="$emit('onCancelAdd')"/>
  </div>
</template>

<script>
import JsonObjectKey from './JsonObjectKey';
import JsonObjectCtrl from './JsonObjectCtrl';

export default {
  name: 'JsonArrayAddr',
  components: {
    JsonObjectKey, JsonObjectCtrl,
    JsonProperty: () => import('./JsonProperty'),
  },
  props: {
    adding: Boolean,
    hideCancel: Boolean,
  },
  data() {
    return {
      arrValue: '',
    };
  },
  methods: {
    onConfirmAdd() {
      this.$emit('onConfirmAdd', this.arrValue);
    },
    onChangeType() {
    },
  },
};
</script>

<style scoped>

</style>
