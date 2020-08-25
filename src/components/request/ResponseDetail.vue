<template>
<!--  <div slot="title" class="padding-left-15 font-bolder">-->
<!--    Response-->
<!--  </div>-->
  <div class="padding-h-20">
    <JsonFormEditor v-model="jsonObj"></JsonFormEditor>
  </div>
</template>

<script>
// import JsonFormEditor from '@/components/editor/json-editor/JsonEditor';
import JsonFormEditor from '@/components/editor/json-editor/JsonEditor';
import {jsonCopy} from '@/util';

const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]';

export default {
  name: 'ResponseDetail',
  components: {
    JsonFormEditor,
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
        male: true,
        female: false,
        detail: {},
        detail0: {a: 1, b: 2},
        arr: [1, 2, 3, {val: 12}],
        arr0: [],
      },
      jsonObjStr: null,
      codemirrorJsonObj: JSON.parse(jsonData),
    };
  },
  computed: {
    targetId() {
      return new Date().getTime().toString(36);
    },
  },
  methods: {
    toStr(v) {
      return JSON.stringify(v,null,2);
    },
    doDisplay() {
      this.jsonObjStr = this.toStr(this.jsonObj);
      console.log(jsonCopy(this.jsonObj));
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.response-detail-container {
  border-left: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
}
</style>
