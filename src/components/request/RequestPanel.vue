<template>
  <ElForm label-width="180px" class="bg-white padding-20">
    <div>http://localhost:8042/cyhr/main/wechat/{index}/cities-text.jsp?openid={openid}&state=index</div>
    <div>http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid={openid}&state=index</div>
    <div class="flex-center font-bolder height-36">
      <span class="inline-block padding-right-8 align-middle">Request URL: </span>
      <ElLink
          :href="requestLinkUrl"
          target="_blank"
          class="font-bolder align-middle">
        {{ requestFinalUrl }}
      </ElLink>
    </div>
    <RequestInputBar :request="request"/>
    <div class="margin-top-20">
      <ElTabs v-model="activeTab" class="request-tabs" type="border-card">
        <ElTabPane label="Params" name="Params">
          <RequestParams @onReset="onReset" v-model="params"></RequestParams>
        </ElTabPane>
        <ElTabPane label="Headers" name="Headers">
          <RequestArgs appendable :params.sync="headers"/>
        </ElTabPane>
      </ElTabs>
    </div>
  </ElForm>
</template>

<script>
import RequestArgs from '@/components/request/RequestArgs';
import RequestInputBar from '@/components/request/RequestInputBar';
import RequestParams from '@/components/request/RequestParams';
import {formatUrl, parseUrl, simpleUrl} from '@/components/request/url-parser';
import {jsonCopy} from '@/util';

function filterAvailableProps(params) {
  const thisArgs = {};
  for (let key in params) {
    thisArgs[key] = params[key].filter(({enable, prop}) => prop && enable);
  }
  return thisArgs;
}

export default {
  name: 'RequestPanel',
  components: {RequestInputBar, RequestParams, RequestArgs},
  data() {
    return {
      request: {
        method: 'GET',
        url: 'http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid={openid}&state=index',
      },

      headers: [],
      urls: {},
      params: {
        hrefPath: [],
        hrefQuery: [],
        hashPath: [],
        hashQuery: [],
      },
      urlParams: {},

      activeTab: 'Params',
    };
  },
  computed: {
    requestFinalUrl({urls}) {
      return formatUrl(urls, this.requestArgs);
    },
    requestLinkUrl({urls}) {
      const {params} = this.requestConfig;
      const hrefPath = params.hrefPath || [];
      for (let param of hrefPath) {
        if (!(param.value || '').trim()) {
          return undefined;
        }
      }
      return formatUrl(urls, params);
    },
    requestArgs() {
      return filterAvailableProps(this.params);
    },
    requestConfig({request: {method}, urls, headers, requestArgs}) {
      return {
        method: (method || 'GET').toUpperCase(),
        headers: filterAvailableProps(headers),
        url: simpleUrl(urls, requestArgs),
        params: requestArgs,
      };
    },
  },
  methods: {

    onReset() {
      this.params = jsonCopy(this.urlParams);
    },
  },
  created() {
    this.$watch(() => this.request.url, {
      handler: url => {
        console.log(url);
        const {params = {}, urls = {}} = url ? parseUrl(url) : {};
        this.urlParams = Object.freeze(jsonCopy(params));
        this.params = params;
        this.urls = urls;
      },
      immediate: true,
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