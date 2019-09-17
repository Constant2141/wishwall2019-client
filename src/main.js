// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
/*使用的时候注意版本*/ 
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './vuex/store'
// import {Dialog} from 'vant'

Vue.use(VueAwesomeSwiper);
// Vue.use(Dialog);

Axios.interceptors.request.use(
  config=>{
    if(localStorage.token){
      config.headers.Authorization = `token${localStorage.token}`;
      return config;
    }
    err=>{
      return Promise.reject(err);
    }
    
})
Vue.prototype.$axios = Axios;

Axios.defaults.baseURL = 'http://192.168.0.106:3000/';
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
 
})