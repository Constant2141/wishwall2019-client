// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
/*使用的时候注意版本*/ 
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { Picker } from 'vant';
import { Popup } from 'vant';
import { Dialog } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import store from './vuex/store'
import { userInfo } from 'os';

// import 'vant/lib/vant-css/index.css'

Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(VueAwesomeSwiper);
Vue.use(Dialog);

Axios.interceptors.request.use(
  config=>{
    if(localStorage.getItem('token')){
      config.headers.common['Authorization']=`Bearer ${localStorage.getItem('token')}`
    }
    return config;
},
    err=>{
      return Promise.reject(err);
    })

Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL = 'http://47.100.12.168:3000/';
// Axios.defaults.baseURL = 'http://192.168.0.106:3000/';
Axios.defaults.baseURL = 'http://192.168.1.28:3000';//庆义的本地测试口
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
 
})