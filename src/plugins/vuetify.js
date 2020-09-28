import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      expand: 'mdi-chevron-down',
      valid: 'mdi-check-bold',
      invalid: 'mdi-alert-outline'
    }
  },
  theme: {
    themes: {
      light: {
        primary: '#83332C',
        secondary: '#E15240',
        buttons: '#E15240',
        homefone: '#FBFBFB',
        inputs: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00'
      },
      dark: {
        primary: '#FF0E00',
        secondary: '#E82F37',
        buttons: '#F54436',
        homefone: '#FEFEFE',
        fields: '#EFEFEF',
        activefield: '#D9D9D9',
        warning: '#FAFF00'
      }
    }
  }
})
