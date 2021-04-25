import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    erea:{name: '',code: '',token:'',avatar: ''},
    ereaTemp:{name: '',code: ''},
    assesssynopsis: {},
    companyName: '',
    height: '',
  },

  actions: {
    changeCity(ctx,city) {
      ctx.commit('changeCity',city)
    },
    changeCityTemp(ctx,city) {
      ctx.commit('changeCityTemp',city)
    },
  },

  mutations: {
    changeCompany(state, newName) {
      state.companyName = newName
    },
    changeHeight(state, height) {
      state.height = height
    },
    changeCity(state, city) {
      state.erea.name = city.name
      state.erea.code = city.code
      state.erea.token = city.token
      state.erea.avatar = city.avatar

      state.ereaTemp.name = city.name
      state.ereaTemp.code = city.code
    },
    changeCityTemp(state, city) {
      state.ereaTemp.name = city.name
      state.ereaTemp.code = city.code
    },
    changeassesssynopsis(state, item) {
      state.assesssynopsis = item
    }
  },

  modules: {

  }
})
