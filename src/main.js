import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import DefinitionComponents from '@/config/packages';
import './plugins/element.js';

Vue.config.productionTip = false;

// Vue.component('VueCodemirror', VueCodemirror);
DefinitionComponents.forEach(component => {
  Vue.component(component.name, component);
});
// Vue.createApp(App).mount('#app')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
