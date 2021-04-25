import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/rem'
import './assets/font/iconfont.css'
import './assets/less/reset.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import './plugins/vant'
import qs from "querystring";


Vue.config.productionTip = false
Vue.use(VueVideoPlayer)
Vue.prototype.$qs = qs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
