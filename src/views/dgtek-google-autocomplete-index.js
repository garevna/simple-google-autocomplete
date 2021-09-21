import Vue from 'vue'
import DgtekGoogleAutocomplete from './DgtekGoogleAutocomplete.vue'

const Components = {
  DgtekGoogleAutocomplete
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
