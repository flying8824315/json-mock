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
    <RequestInputBar @onSendRequest="onSendRequest" :request="request"/>
    <ElTabs v-model="activeTab" class="request-tabs margin-top-20" type="border-card">
      <ElTabPane label="Params" name="Params">
        <RequestParams @onReset="onReset" v-model="params"></RequestParams>
      </ElTabPane>
      <ElTabPane label="Headers" name="Headers">
        <RequestArgs appendable :params.sync="headers"/>
      </ElTabPane>
    </ElTabs>
    <ResponseDetail/>
  </ElForm>
</template>

<script>
import axios from 'axios';
import RequestArgs from '@/components/request/RequestArgs';
import RequestInputBar from '@/components/request/RequestInputBar';
import RequestParams from '@/components/request/RequestParams';
import ResponseDetail from '@/components/request/ResponseDetail';
import {formatUrl, parseUrl, simpleUrl} from '@/components/request/url-parser';
import {jsonCopy} from '@/util';

function filterAvailable(props) {
  return props.filter(({enable, prop}) => prop && enable);
}

function formatArgs(props) {
  return filterAvailable(props).reduce((total, {prop, value}) => {
    total[prop] = value || '';
    return total;
  }, {});
}

function filterAvailableProps(params) {
  const thisArgs = {};
  for (let key in params) {
    thisArgs[key] = filterAvailable(params[key]);
  }
  return thisArgs;
}

export default {
  name: 'RequestPanel',
  components: {RequestInputBar, RequestParams, RequestArgs, ResponseDetail},
  props: {
    requestUtil: [Object, Function],
  },
  data() {
    return {
      request: {
        method: 'GET',
        url: 'http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid=&state=index',
      },

      headers: [],
      // URL 各个片段
      urls: {},
      params: {
        hrefPath: [],
        hrefQuery: [],
        hashPath: [],
        hashQuery: [],
      },
      // 缓存
      urlParams: {},

      activeTab: 'Params',
    };
  },
  computed: {
    requestCaller() {
      return this.requestUtil || axios;
    },
    requestFinalUrl({urls}) {
      return formatUrl(urls, this.requestArgs);
    },
    requestLinkUrl({urls}) {
      const {params} = this.requestConfig;
      const hrefPath = params.hrefPath || [];
      // RESTful 请求参数必填
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
        headers: formatArgs(headers),
        url: simpleUrl(urls, requestArgs),
        params: formatArgs(requestArgs.hrefQuery),
      };
    },
  },
  methods: {
    onSendRequest() {
      const config = this.requestConfig;
      const caller = this.requestCaller;
      caller.request(config).then(res => {
        console.log(res);
      }, err => {
        for (let key in err) {
          console.log(key, err[key]);
        }
        // console.log(err);
      });
      // console.log(this.requestConfig);
    },
    onReset() {
      this.params = jsonCopy(this.urlParams);
    },
  },
  created() {
    this.$watch(() => this.request.url, {
      handler: url => {
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