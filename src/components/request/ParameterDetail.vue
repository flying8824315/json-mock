<template>
  <div>
    <ElCollapse v-model="activeCollapseTab">
      <ElCollapseItem name="1">
        <div slot="title" class="font-bolder flex width-full">
          <div class="flex-1" v-if="hasRestFul">Restful Params</div>
          <div class="flex-1 flex-v-center width-full margin-right-20">
            <span class="flex-1" :class="{'margin-left-10':hasRestFul}">Request Params</span>
            <ElButtonGroup @click.native.stop>
              <ElButton type="primary" plain @click="$emit('onReset')" icon="el-icon-refresh"/>
              <ElButton type="primary" plain icon="el-icon-position"/>
            </ElButtonGroup>
          </div>
        </div>
        <div class="flex">
          <ParamArgsList
              v-if="hasRestFul"
              class="width-half"
              :params.sync="value.hrefPath"/>
          <ParamArgsList
              appendable
              :class="{'keep-width-full':!hasRestFul}"
              class="width-half"
              :params.sync="value.hrefQuery"/>
        </div>
      </ElCollapseItem>
      <ElCollapseItem name="2" title="Request Body">
        <div slot="title" class="flex-v-center width-full margin-right-50">
          <div class="font-bolder">Request Body</div>
          <RequestContentType class="flex-1" v-model="contentTypeVal"/>
        </div>
        <div class="flex">
          <div class="flex-1"></div>
          <ElSelect v-model="jsonEditorTheme">
            <ElOption v-for="name in jsonEditorThemeArr"
                      :key="name" :value="name" :label="name"/>
          </ElSelect>
        </div>
        <JsonEditor ref="jsonEditor" class="json-editor" :theme="jsonEditorTheme" v-model="requestBody"/>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<script>
// import {JsonEditor} from '@/components/editor';
import JsonEditor from '@/components/editor/json';
import ParamArgsList from '@/components/request/ParamArgsList';
import RequestContentType from '@/components/request/RequestContentType';

function hasProperties(obj) {
  return obj && Object.keys(obj).length;
}

export default {
  name: 'ParameterDetail',
  components: {ParamArgsList, RequestContentType, JsonEditor},
  props: {
    // 请求参数
    value: {
      type: Object,
      default() {
        return {
          hrefPath: [],
        };
      },
    },
    // request body
    body: {},
    contentType: String,
  },
  data() {
    return {
      activeCollapseTab: '1',
      jsonEditorTheme: null,
      jsonEditorThemeArr: [],
    };
  },
  computed: {
    contentTypeVal: {
      get({contentType}) {
        return contentType;
      },
      set(value) {
        this.$emit('update:contentType', value);
      },
    },
    hasRestFul() {
      return hasProperties(this.value.hrefPath);
    },
    requestBody: {
      get: ({body}) => body,
      set(value) {
        this.inputBody(value);
      },
    },
    inputBody() {
      const {'update:body': update} = this.$listeners;
      return update || (() => {
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      // const themes = this.$refs.jsonEditor.getThemeNames();
      // this.jsonEditorThemeArr = themes;
    });
  },
};
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
</style>
