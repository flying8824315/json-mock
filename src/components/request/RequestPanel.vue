<template>
  <div class="bg-white padding-20">
    <div>
      http://localhost:8042/cyhr/main/wechat/index-cities-text.jsp?openid={openid}&state=index
    </div>
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

export default {
  name: 'RequestPanel',
  components: {RequestInputBar, RequestParams},
  data() {
    return {
      request: {
        method: 'GET',
        url: '',
      },

      params: {
        restful: {},
        search: {},
        body: {},
      },

      activeTab: 'Params',
    };
  },
  methods: {},
  created() {
    this.$watch(() => this.request.url, url => {
      const mappings = {};
      if (url) {
        const {params} = this, {restful} = params, restfulArgs = {};
        let start = 0;
        do {
          const open = url.indexOf('{', start);
          if (open >= 0) {
            start = open + 1;
            const close = url.indexOf('}', open);
            if (close > open) {
              start = close + 1;
              const placeholder = url.slice(open, close + 1);
              const prop = placeholder.slice(1, -1).trim();
              restfulArgs[prop] = restful[prop] || '';
              mappings[placeholder] = prop;
            }
          } else {
            break;
          }
          params.restful = restfulArgs;
          // eslint-disable-next-line no-constant-condition
        } while (true);
        console.log(mappings);
      } else {
        //
      }
      console.log(url);
    });

    this.$watch(() => this.params.restful, {
      handler(now) {
        console.log(now);
      },
      deep: true,
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