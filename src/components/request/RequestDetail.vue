<template>
  <ElTabs v-model="activeTab" class="request-tabs" type="border-card">
    <ElTabPane label="Params" name="Params">
      <ParameterDetail
          v-model="paramsDetail"
          :contentType.sync="contentTypeVal"
          @onReset="$emit('onResetParams')"
          :body.sync="bodyDetail"/>
    </ElTabPane>
    <ElTabPane label="Headers" name="Headers">
      <ParamArgsList appendable :params.sync="headerDetail"/>
    </ElTabPane>
  </ElTabs>
</template>

<script>
import ParamArgsList from '@/components/request/ParamArgsList';
import ParameterDetail from '@/components/request/ParameterDetail';
import {newRequestArg} from '@/components/request/url-parser';

export default {
  name: 'RequestDetail',
  components: {ParameterDetail, ParamArgsList},
  props: {
    request: Object,
    body: {},
    headers: [Array],
    params: Object,
  },
  computed: {
    bodyDetail: {
      get() {
        return this.body;
      },
      set(body) {
        this.$emit('update:body', body);
      },
    },
    headerDetail: {
      get() {
        return this.headers;
      },
      set(headers) {
        this.$emit('update:headers', headers);
      },
    },
    paramsDetail: {
      get() {
        return this.params;
      },
      set(params) {
        this.$emit('update:params', params);
      },
    },
    contentTypeVal: {
      get({headerDetail}) {
        if (headerDetail) {
          const {length} = headerDetail;
          for (let i = 0; i < length; i++) {
            const thisHeader = headerDetail[i];
            if (!thisHeader.prop) {
              continue;
            }
            if (thisHeader.prop.toLowerCase() === 'content-type') {
              return thisHeader.value;
            }
          }
        }
        return null;
      },
      set(value) {
        this.onUpdateContentType(value);
      },
    },
  },
  data() {
    return {
      activeTab: 'Params',
    };
  },
  methods: {
    onUpdateContentType(value) {
      const {headerDetail} = this, placeholder = 'content-type';
      if (headerDetail) {
        let presentContentTypeHeader = false;
        // 如果存在有值的 header 最后一个的位置
        let lastPresentIdx = 0;
        const {length} = headerDetail;
        for (let i = 0; i < length; i++) {
          const thisHeader = headerDetail[i];
          if (thisHeader.prop || thisHeader.value) {
            lastPresentIdx = i;
          }
          const {prop} = thisHeader;
          if (!prop) {
            continue;
          }
          const isContentType = placeholder === prop.toLowerCase();
          if (!presentContentTypeHeader) {
            presentContentTypeHeader = isContentType;
          }
          if (isContentType) {
            thisHeader.value = value;
          }
        }
        if (!presentContentTypeHeader) {
          headerDetail.splice(lastPresentIdx, 0, newRequestArg(placeholder, placeholder, value));
        }
      } else {
        this.headerDetail = [newRequestArg(placeholder, placeholder, value)];
      }
    },
  },
};
</script>

<style scoped>

</style>
