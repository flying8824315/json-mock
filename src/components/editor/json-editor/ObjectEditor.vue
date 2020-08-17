<template>
  <div>
    <KeyValueEditor
        ref="kv"
        class="margin-top-15"
        v-for="(propDetail,index) in dataDetail"
        @remove="onRemoveIdx(index)"
        :key="propDetail.key"
        :data="propDetail"
        :origin="data"/>
    <KeyValueAddr class="margin-top-15" :origin="data"/>
  </div>
</template>

<script>
import {typeOf} from '@/components/editor/json-editor/util';
import KeyValueAddr from '@/components/editor/json-editor/KeyValueAddr';
import KeyValueEditor from '@/components/editor/json-editor/KeyValueEditor';

export default {
  name: 'ObjectEditor',
  components: {KeyValueEditor, KeyValueAddr},
  props: {
    data: Object,
  },
  computed: {
    dataDetail() {
      const {data} = this, detail = [];
      for (let key in data) {
        const value = data[key];
        detail.push({key: key, value, type: typeOf(value)});
      }
      return detail;
    },
  },
  methods: {
    onRemoveIdx(idx) {
      const {dataDetail} = this;
      dataDetail.splice(idx, 1);
    },
    getData() {
    },
  },
};
</script>

<style scoped>

</style>