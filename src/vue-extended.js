import Vue from 'vue'

window[Symbol.for('global.addressData')] = {
  address: '',
  coordinates: null,
  addressComponents: {},
  url: null
}

export default Vue
