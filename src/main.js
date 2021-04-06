import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

import 'dgtek-styles/css/fonts.scss'
import 'dgtek-styles/css/variables.scss'

Vue.config.productionTip = false

Vue.prototype.earthRadius = 6378137 /* meters */

Vue.prototype.convertDegToRad = deg => deg * (Math.PI / 180)

Vue.prototype.calcDistance = function (point, target) {
  const delta = {
    lat: this.convertDegToRad(target.lat - point.lat),
    lng: this.convertDegToRad(target.lng - point.lng)
  }
  const a = Math.pow(Math.sin(delta.lat / 2), 2) + Math.cos(this.convertDegToRad(point.lat) / 2) * Math.cos(this.convertDegToRad(target.lat) / 2) * Math.pow(Math.sin(delta.lng / 2), 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(this.earthRadius * c)
}

Vue.prototype.getDistance = window.google.maps.geometry.spherical.computeDistanceBetween
Vue.prototype.LatLng = window.google.maps.LatLng

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
