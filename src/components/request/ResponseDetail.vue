<template>
  <ElCollapse class="margin-top-20 response-detail-container">
    <ElCollapseItem>
      <div slot="title" class="padding-left-15 font-bolder">
        Response
      </div>
      <div>
        <!--        -->
        <JsonEditor :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }"
            :objData="jsonData"
            v-model="jsonData"></JsonEditor>
        <JsonEditor0 :data="jsonObj"></JsonEditor0>
      </div>
      <div ref="jsonEditor" :id="targetId" style="height: 400px;"></div>
    </ElCollapseItem>
  </ElCollapse>
</template>

<script>
import {JsonEditor} from '@/components/editor/index';
import JSONEditor from 'jsoneditor'

export default {
  name: 'ResponseDetail',
  components: {
    JsonEditor0: JsonEditor,
  },
  data() {
    return {
      jsonData: {
        name: 'mike',
        age: 23,
        phone: '18552129932',
        address: ['AAA C1', 'BBB C2'],
      },
      jsonArr: {},
      jsonObj: {
        name: 'computer',
        age: 25,
      },
    };
  },
  computed:{
    targetId(){
      return new Date().getTime().toString(36);
    }
  },
  mounted() {
    const container = this.$refs.jsonEditor
    const options = {mode: 'tree'};
    const editor = new JSONEditor(container, options);
  }
};
</script>

<style scoped>
.response-detail-container {
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
</style>