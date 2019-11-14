import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    sex:null
  },
  mutations:{
    initSex(state,payload){
      state.sex = payload
    }
  },
  plugins: [createPersistedState()]
})

export default store
