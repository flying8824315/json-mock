<template>
  <div class="border-box padding-h-5">
    <h4 v-if="label">{{ label }}</h4>
    <div>
      <transition
          appear name="el-zoom-in-top"
          @after-leave="onDelete(index)"
          v-for="(param,index) in parameters"
          :key="index">
        <ParamArgEntity v-show="param.available" :param="param"/>
      </transition>
    </div>
  </div>
</template>

<script>
import {newRequestArg} from '@/components/request/url-parser';
import ParamArgEntity from '@/components/request/ParamArgEntity';

export default {
  name: 'ParamArgsList',
  components:{ParamArgEntity},
  props: {
    label: String,
    params: {
      type: Array,
    },
    appendable: Boolean,
  },
  computed: {
    parameters({params}) {
      return params ? [...params] : [];
    },
  },
  methods: {
    onAppend() {
      this.params.push(newRequestArg());
    },
    onDelete(index) {
      this.params.splice(index, 1);
    },
  },
  created() {
    if (this.appendable) {
      this.$watch('params', {
        handler(now) {
          if (now) {
            const {length} = now;
            if (length > 0) {
              const lastIdx = length - 1, last = now[lastIdx];
              if (last.prop) {
                if (last.value) {
                  this.onAppend();
                }
              } else if (length > 1) {
                const prev = now[length - 2];
                if (!(prev.prop || prev.value)) {
                  this.onDelete(lastIdx);
                }
              }
            } else {
              this.onAppend();
            }
          } else {
            this.$emit('update:params', []);
          }
        },
        deep: true,
        immediate: true,
      });
    }
  },
};
</script>

<style scoped lang="scss">
</style>
