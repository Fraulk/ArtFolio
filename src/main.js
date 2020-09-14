import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$apiKey = '0ca822bd8f8216372f27904677012131'
Vue.prototype.$userId = '164696274@N08'
Vue.prototype.$http = axios

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
