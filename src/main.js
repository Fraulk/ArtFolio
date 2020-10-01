import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$apiKey = process.env.VUE_APP_API_KEY
Vue.prototype.$userId = process.env.VUE_APP_USER_ID
Vue.prototype.$http = axios

//me: 164696274@N08
//random: 87106931@N00
//vik: 152818956@N06
//phoenix: 142309877@N07

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
