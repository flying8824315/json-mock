import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function storeFactory(config) {
  return new Vuex.Store(config);
}
