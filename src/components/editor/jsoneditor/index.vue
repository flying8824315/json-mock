<template>
  <VueCodemirror class="vue-code-mirror" :options="cmOptions"></VueCodemirror>
</template>

<script>
import {codemirror} from 'vue-codemirror/src';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/rubyblue.css';
// lint
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

require('script-loader!jsonlint');

export default {
  name: 'JsonEditor',
  components: {
    VueCodemirror: codemirror,
  },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        theme: 'rubyblue',
        lineNumbers: true,
        line: true,
        lint: true,
      },
    };
  },
};
</script>

<style scoped lang="scss">
.vue-code-mirror {
  height: 100%;
  position: relative;

  ::v-deep {
    .CodeMirror {
      font-family: 'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace;
      height: auto;
      min-height: 300px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }
}
</style>