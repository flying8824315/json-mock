<template>
  <ElTabs v-model="activeTab" class="request-tabs" type="border-card">
    <ElTabPane label="Params" name="Params">
      <ParameterDetail
          v-model="paramsDetail"
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

export default {
  name: 'RequestDetail',
  components: {ParameterDetail, ParamArgsList},
  props: {
    request: Object,
    body: [Object, Array, String],
    headers: [Object, Array],
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
  },
  data() {
    return {
      activeTab: 'Params',
    };
  },
};
</script>

<style scoped>

</style>
