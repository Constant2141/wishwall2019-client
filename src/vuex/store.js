import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
  userInfo: null,
  token: '',
  token_exp: '',
}

const mutations = {
  initUser(state, payload) {
    for(let prop in payload){
      state[prop] = payload[prop]
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})

