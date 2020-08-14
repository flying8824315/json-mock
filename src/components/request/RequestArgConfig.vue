<template>
  <div class="width-500">
    <div class="flex">
      <ElInput class="flex-1" placeholder="固定值"></ElInput>
      <ElButton type="primary">确定</ElButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestArgConfig',
  data() {
    return {
      types: [
        {id: 'id_card', name: '身份证号'},
        {id: 'mobile', name: '手机号'},
        {id: 'lower|upper|number|_|$', name: '字母'},
      ],
    };
  },
};
</script>

<style scoped>

</style>