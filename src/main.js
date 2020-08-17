import Vue from 'vue';
import App from './App.vue';
import JsonEditor from 'vue-json-edit';
import router from './router';
import store from './store';
import DefinitionComponents from '@/config/packages';
import './plugins/element.js';
import 'jsoneditor/dist/jsoneditor.min.css'

Vue.config.productionTip = false;

Vue.use(JsonEditor);
DefinitionComponents.forEach(component => {
  Vue.component(component.name, component);
});
// Vue.createApp(App).mount('#app')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
