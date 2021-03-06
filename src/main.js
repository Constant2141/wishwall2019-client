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
import { PullRefresh } from 'vant';
import { Uploader } from 'vant';
import { Toast } from 'vant';
import { Loading } from 'vant';
import { Overlay } from 'vant';

Vue.use(Overlay);
Vue.use(Loading);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(VueAwesomeSwiper);
Vue.use(Dialog);
Vue.use(PullRefresh);
Vue.use(Toast);

Vue.use(Uploader);

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
Axios.defaults.baseURL = 'http://47.100.12.168:3000/';
// Axios.defaults.baseURL = 'http://192.168.0.106:3000/';
// Axios.defaults.baseURL = 'http://192.168.1.28:3000';//庆义的本地测试口
Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
