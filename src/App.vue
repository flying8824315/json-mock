<template>
  <div id="app">
    <ElContainer direction="vertical">
      <ElHeader>a</ElHeader>
      <ElContainer>
        <ElMain>
          <div class="main-content margin-bottom-200">
            <RequestPanel/>
          </div>
        </ElMain>
      </ElContainer>
    </ElContainer>
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
body {
  overflow: scroll;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main-content {
  width: 1216px;
  margin: auto;
}

.im-clear-gaps.el-form-item {
  margin-bottom: 0 !important;
}
</style>
