<template>
  <div v-if="adding" class="json-flex json-pair">
    <JsonObjectKey
        v-model="pair.key"
        editing/>
    <JsonProperty
        editing
        class="flex-1"
        v-model="pair.value"
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

function defaultKeyVal() {
  return {available: true, key: '', value: '', type: 'String'};
}

export default {
  name: 'JsonObjectAddr',
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
      pair: defaultKeyVal(),
    };
  },
  methods: {
    onConfirmAdd() {
      this.$emit('onConfirmAdd', this.pair);
    },
    onChangeType(type) {
      this.pair.type = type;
    },
  },
};
</script>

<style scoped>

</style>
