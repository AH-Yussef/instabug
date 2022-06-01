import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data.js';
import control from './modules/control.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    data,
    control,
  }
})
