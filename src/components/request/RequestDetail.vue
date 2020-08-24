<template>
  <div>
    <RequestInputBar :request="request"/>
    <ElTabs v-model="activeTab" class="request-tabs margin-top-20" type="border-card">
      <ElTabPane label="Params" name="Params">
        <RequestParams
            v-model="paramsDetail"
            @onReset="$emit('onResetParams')"
            :body.sync="bodyDetail"/>
      </ElTabPane>
      <ElTabPane label="Headers" name="Headers">
        <RequestArgs appendable :params.sync="headerDetail"/>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script>
import RequestArgs from '@/components/request/RequestArgs';
import RequestInputBar from '@/components/request/RequestInputBar';
import RequestParams from '@/components/request/RequestParams';

export default {
  name: 'RequestDetail',
  components: {RequestParams, RequestInputBar, RequestArgs},
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
