<template>
  <div>
    <ElInput v-model="requestUrl"></ElInput>
  </div>
</template>

<script>
export default {
  name: 'RequestPanel',
  data(){
    return {
      requestUrl: ''
    }
  },
};
</script>

<style scoped>

</style>