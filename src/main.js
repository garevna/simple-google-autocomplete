import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import 'dgtek-styles/css/fonts.scss'
import 'dgtek-styles/css/variables.scss'

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
