import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    userInfo:localStorage.getItem('userInfo'),
    token:localStorage.getItem('token'),
    token_exp:localStorage.getItem('token_exp'),
  },
  mutations:{
    
  }
})

export default store

