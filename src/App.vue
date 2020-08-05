<template>
  <div id="app">
    <ElContainer direction="vertical">
      <ElHeader>a</ElHeader>
      <ElContainer>
        <ElMain>
          <div>
            <RequestPanel/>
          </div>
        </ElMain>
      </ElContainer>
    </ElContainer>
    <!--    <img src="./assets/logo.png">-->
    <!--    <div>-->
    <!--      <p>-->
    <!--        If Element is successfully added to this project, you'll see an-->
    <!--        <code v-text="'<el-button>'"></code>-->
    <!--        below-->
    <!--      </p>-->
    <!--      <el-button>el-button</el-button>-->
    <!--    </div>-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
import RequestPanel from '@/components/request/RequestPanel';
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    RequestPanel,
    // HelloWorld
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
