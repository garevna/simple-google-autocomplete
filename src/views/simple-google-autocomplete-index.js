import Vue from 'vue'
import SimpleGoogleAutocomplete from './SimpleGoogleAutocomplete.vue'

const Components = {
  SimpleGoogleAutocomplete
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
