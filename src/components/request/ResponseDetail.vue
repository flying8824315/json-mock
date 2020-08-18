<template>
  <ElCollapse class="margin-top-20 response-detail-container">
    <ElCollapseItem>
      <div slot="title" class="padding-left-15 font-bolder">
        Response
      </div>
      <JsonEditor0 v-model="codemirrorJsonObj"></JsonEditor0>
    </ElCollapseItem>
  </ElCollapse>
</template>

<script>
import {JsonEditor} from '@/components/editor/index';

const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'

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
      codemirrorJsonObj: JSON.parse(jsonData),
    };
  },
  computed:{
    targetId(){
      return new Date().getTime().toString(36);
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
.response-detail-container {
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
</style>
