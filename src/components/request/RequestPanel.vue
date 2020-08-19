<template>
  <ElForm label-width="180px" class="bg-white padding-20">
    <div>http://localhost:8042/cyhr/main/wechat/{index}/cities-text.jsp?openid={openid}&state=index</div>
    <div>http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid={openid}&state=index</div>
    <div class="flex-center font-bolder height-36">
      <span class="inline-block padding-right-8 align-middle">Request URL: </span>
      <ElLink
          :href="displayUrl"
          target="_blank"
          class="font-bolder align-middle">
        {{ displayUrl }}
      </ElLink>
    </div>
    <RequestInputBar @onSendRequest="onSendRequest" :request="request"/>
    <ElTabs v-model="activeTab" class="request-tabs margin-top-20" type="border-card">
      <ElTabPane label="Params" name="Params">
        <RequestParams
            v-model="params"
            @onReset="onReset"
            :body.sync="body"/>
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
  return (props).filter(({enable, prop}) => prop && enable);
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
    const args = params[key];
    thisArgs[key] = filterAvailable(args);
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
      urls: {
        hrefPath: null,
        hrefQuery: null,
        hashPath: null,
        hashQuery: null,
      },
      // 从 url 中解析的所有参数，可修改
      params: {
        hrefPath: [],
        hrefQuery: [],
        hashPath: [],
        hashQuery: [],
      },
      // 从 url 中解析的所有参数的缓存副本，不可修改
      urlParams: {},
      // request body 的 json 字符串
      body: '',

      activeTab: 'Params',
    };
  },
  computed: {
    requestCaller() {
      return this.requestUtil || axios;
    },
    // 展示在页面的 rul
    displayUrl({urls}) {
      return formatUrl(urls, this.availableArgs);
    },
    // 页面 url
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
    // 所有可用的参数
    availableArgs() {
      return filterAvailableProps(this.params);
    },
    // 请求参数的 params
    requestParams() {
      return formatArgs(this.availableArgs.hrefQuery);
    },
    requestBodyData() {
      try {
        return JSON.parse(this.body);
      } catch (e) {
        return null;
      }
    },
    requestConfig({request: {method}, urls, headers, availableArgs}) {
      return {
        method: (method || 'GET').toUpperCase(),
        headers: formatArgs(headers),
        url: simpleUrl(urls, availableArgs),
        params: this.requestParams,
        data: this.requestBodyData,
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
      });
    },
    onReset() {
      this.params = jsonCopy(this.urlParams);
    },
    setRequestAll(data) {
      if (data) {
        const {request: that, ...other} = data, {request: self} = this;
        self.request = that;
        this.$nextTick(() => {
          for (let key in other) {
            this[key] = other[key];
          }
        });
      }
    },
    getRequestAll() {
      const {activeTab, ...data} = this;
      return jsonCopy(data);
    },
  },
  created() {
    this.$watch(() => this.request.url, {
      handler: url => {
        const {params = {}, urls = {}} = url ? parseUrl(url) : {};
        // console.log(params);
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
