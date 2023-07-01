
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store/index'
import './plugins/base'
import './plugins/vue-world-map'
import urlParse  from './utils/urlParse'


Vue.use(VueCookies, { expires: '30d' });
Vue.config.productionTip = false
Vue.prototype.$urlParse=urlParse

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

