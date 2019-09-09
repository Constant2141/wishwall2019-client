import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentUser:{
    userName:'',
    userAvatar:''
  }, //当前用户
  token:'',
  isNewUser: true //是否是首次登陆
}
const mutations = {
  saveToken(state,token){
    state.token = token
  },
  Login(state){
    state.isNewUser = true
  }
}



