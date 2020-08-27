<template>
  <ElForm label-width="180px" class="bg-white padding-20">
    <div>http://localhost:8042/cyhr/main/wechat/{index}/cities-text.jsp?openid={openid}&state=index</div>
    <div>http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid={openid}&state=index</div>
    <div class="flex-center font-bolder height-36">
      <span
          title="点击复制"
          @click="onCopy"
          class="inline-block padding-right-8 align-middle request-url-copy">
        <ElIcon class="font-bolder" name="copy-document"></ElIcon>
        <span class="margin-left-5">Request URL:</span>
      </span>
      <ElLink
          ref="displayUrl"
          :href="displayUrl"
          target="_blank"
          class="font-bolder align-middle request-selection">
        <span>{{ displayUrl }}</span>
      </ElLink>
      <ElButton type="primary" @click="onSendRequest">发送</ElButton>
    </div>
    <ElCollapse v-model="activePanel">
      <ElCollapseItem title="Request" name="request">
        <div slot="title" class="flex width-full">
          <div class="font-bolder">Request：</div>
          <RequestInputUrl @click.native.stop :request="request"/>
          <div class="width-50"></div>
        </div>
        <RequestDetail
            @onResetParams="onReset"
            :request="request"
            :body.sync="body"
            :headers.sync="headers"
            :params.sync="params"/>
      </ElCollapseItem>
      <ElCollapseItem name="response">
        <div slot="title" class="font-bolder">Response：</div>
        <ResponseDetail/>
      </ElCollapseItem>
    </ElCollapse>
  </ElForm>
</template>

<script>
import axios from 'axios';
import RequestInputUrl from '@/components/request/RequestInputUrl';
import RequestDetail from '@/components/request/RequestDetail';
import ResponseDetail from '@/components/request/ResponseDetail';
import {formatUrl, parseUrl, simpleUrl} from '@/components/request/url-parser';
import {clipboardCopy, jsonCopy} from '@/util';

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
  components: {RequestInputUrl, ResponseDetail, RequestDetail},
  props: {
    requestUtil: [Object, Function],
  },
  data() {
    return {
      request: {
        method: 'GET',
        url: 'http://192.168.133.107:8042/cyhr/main/wechat/index-cities-text.jsp?openid=&state=index',
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
      body: {},

      activePanel: 'request',
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
      this.activePanel = 'response';
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
    onCopy() {
      clipboardCopy(this.$refs.displayUrl.$el);
      this.$message.success('已复制');
    },
    setRequestAll(data) {
      if (data) {
        const {request: that, ...other} = data, {request: self} = this;
        that.method = that.method || 'GET';
        that.url = that.url || '';
        self.request = that;
        this.$nextTick(() => {
          for (let key in other) {
            this[key] = other[key];
          }
        });
      }
    },
    getRequestAll() {
      const {activePanel, ...data} = this;
      return jsonCopy(data);
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
<style scoped lang="scss">
.request-url-copy {
  cursor: pointer;
}
</style>
