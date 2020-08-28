<template>
  <div class="flex-v-center content-type-val">
    <FormRadioGroup
        clearGaps
        style="width: 620px;"
        class="thin-radio-gaps"
        labelWidth="110px"
        label="Content-Type"
        v-model="checkedVal"
        @click.native.stop
        :options="contentTypeArr"/>
    <ElSelect class="flex-1 font-bolder"
        filterable
        clearable
        allow-create
        default-first-option
        @change="onChangeVal"
        @keyup.native.stop
        v-model="inputVal"
        v-show="isCustom">
      <ElOption
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
      </ElOption>
    </ElSelect>
  </div>
</template>

<script>
const json = 'application/json',
    urlencoded = 'x-www-form-urlencoded',
    formData = 'form-data',
    custom = 'Raw';

const baseTypes = [json, urlencoded, formData];
const fullTypes = [...baseTypes, custom];

function contains(strOrArr, value) {
  return strOrArr.indexOf(value) >= 0;
}

export default {
  name: 'RequestContentType',
  props: {
    value: {
      type: String,
      default: json,
    },
  },
  watch: {
    value: {
      handler(val) {
        const has = contains(baseTypes, val);
        this.checkedVal = has ? val : custom;
        if (!has && val) {
          const {options} = this;
          if (!contains(options, val)) {
            this.options.push(val);
          }
          this.inputVal = val;
        }
      },
      immediate: true,
    },
    checkedVal(val) {
      if (val === custom) {
        const {options} = this;
        const value = options.length ? options[0] : '';
        this.onChangeVal(value);
        this.inputVal = value;
      } else {
        this.$emit('input', val);
      }
    },
  },
  computed: {
    isCustom() {
      return this.checkedVal === custom;
    },
  },
  data() {
    return {
      checkedVal: json,
      inputVal: '',
      contentTypeArr: fullTypes.map(type => ({id: type, name: type})),
      options: [],
    };
  },
  methods: {
    onChangeVal(v) {
      this.$emit('input', v);
    },
  },
};
</script>

<style lang="scss">
.thin-radio-gaps {
  & .el-form-item__label {
    padding-right: 0;
  }

  & .el-radio {
    margin-right: 15px;
  }
}

</style>
<style scoped lang="scss">
.content-type-val {
  ::v-deep {

  }
}
</style>
