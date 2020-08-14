<template>
  <div class="flex-v-center">
    <FormRadioGroup
        clearGaps
        style="width: 620px;"
        class="thin-radio-gaps"
        labelWidth="110px"
        label="Content-Type"
        v-model="checkedVal"
        @click.native.stop
        :options="contentTypeArr"/>
    <ElSelect
        class="flex-1"
        filterable
        clearable
        allow-create
        @keyup.native.stop
        v-model="inputVal"
        v-show="isCustom"/>
  </div>
</template>

<script>
const json = 'application/json', custom = 'Custom';
export default {
  name: 'RequestContentType',
  props: {
    value: {
      type: String,
      default: json,
    },
  },
  data() {
    return {
      checkedVal: json,
      inputVal: '',
      contentTypeArr: [
        {id: json, name: json},
        {id: 'x-www-form-urlencoded', name: 'x-www-form-urlencoded'},
        {id: 'form-data', name: 'form-data'},
        {id: custom, name: custom},
      ],
    };
  },
  computed: {
    isCustom() {
      return this.checkedVal === custom;
    },
  },
  watch: {
    checkedVal(val) {
      this.inputVal = val === custom ? '' : val;
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
<style scoped>

</style>