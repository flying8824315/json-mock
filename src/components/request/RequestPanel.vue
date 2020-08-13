<template>
  <div class="bg-white padding-20">
    <div>URL: {{ formattedUrl }}</div>
    <div>http://localhost:8042/cyhr/main/wechat/{index}/cities-text.jsp?openid={openid}&state=index</div>
    <div>http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid={openid}&state=index</div>
    <RequestInputBar :request="request"></RequestInputBar>
    <div class="margin-top-20">
      <ElTabs v-model="activeTab" class="request-tabs" type="border-card">
        <ElTabPane label="Params" name="Params">
          <RequestParams v-model="params"></RequestParams>
        </ElTabPane>
        <ElTabPane label="Headers" name="Headers"></ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script>
import RequestInputBar from '@/components/request/RequestInputBar';
import RequestParams from '@/components/request/RequestParams';
import {formatUrl, parseUrl} from '@/components/request/url-parser';
// import {jsonCopy} from '@/util';

export default {
  name: 'RequestPanel',
  components: {RequestInputBar, RequestParams},
  data() {
    return {
      request: {
        method: 'GET',
        url: '',
      },

      urls: {},
      params: {
        hrefPath: [],
        hrefQuery: [],
        hashPath: [],
        hashQuery: [],
      },

      activeTab: 'Params',
    };
  },
  computed: {
    formattedUrl() {
      return formatUrl(this.urls, this.params);
    },
  },
  methods: {},
  created() {
    this.$watch(() => this.request.url, url => {
      const {params, urls} = url ? parseUrl(url) : {};
      // console.log(jsonCopy(params), jsonCopy(urls));
      this.params = params;
      this.urls = urls;
    });
  },
};
</script>
<style lang="scss">
.el-tabs--border-card.request-tabs {
  box-shadow: none;
}
</style>
<style scoped>

</style>