import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    wishwallUser:null
  },
  mutations:{
    initUser(state,payload){
      state.wishwallUser = payload
    }
  },
  plugins: [createPersistedState()]
})

export default store
