<template>
  <v-row justify="center">
    <input
      ref="autocompleteAddress"
      class="input-field py-2 px-4"
      placeholder="Address"
    />

    <!-- <v-btn text large @click="catchEvent" color="#900">
      SUBMIT
    </v-btn> -->
  </v-row>
</template>

<script>

import 'dgtek-styles/css/fonts.scss'
import 'dgtek-styles/css/variables.scss'

import { createAutocomplete, normalizeAddress } from '@/helpers'

export default {
  name: 'SimpleGoogleAutocomplete',

  // props: ['submit', 'address', 'addressComponents', 'coordinates', 'url'],

  computed: {
    localAddress: {
      get () {
        return this.address
      },
      set (val) {
        this.$emit('update:address', normalizeAddress(val))
      }
    }
  },

  // watch: {
  //   localAddress (val) {
  //     console.log('LOCAL ADDRESS CHANGED: ', val)
  //   },
  //   mapIsReady (val) {
  //     if (val) {
  //       window[Symbol.for('global.addressData')] = {
  //         address: '',
  //         coordinates: null,
  //         addressComponents: {},
  //         url: null
  //       }
  //       createAutocomplete(this.$refs.autocompleteAddress)
  //     }
  //   }
  // },

  methods: {
    // catchEvent (event) {
    //   console.log(event.target.value)
    //   const { address, addressComponents, coordinates, url } = window[Symbol.for('global.addressData')]
    //   console.log(address, addressComponents, coordinates, url)
    //   window[Symbol.for('global.addressData')].address = normalizeAddress(address)
    //   window[Symbol.for('global.addressData')].coordinates = [coordinates.lng, coordinates.lat]
    //
    //   console.log(address, addressComponents, window[Symbol.for('global.addressData')].coordinates, url)
    //
    //   this.$emit('update:address', window[Symbol.for('global.addressData')].address)
    //   this.$emit('update:coordinates', window[Symbol.for('global.addressData')].coordinates)
    //   this.$emit('update:url', url)
    //   this.$emit('update:submit', true)
    // }
  },

  beforeMount () {
    // function waitForGoogleMaps () {
    //   if (!window.google) window.requestAnimationFrame(waitForGoogleMaps.bind(this))
    //   else createAutocomplete(this.$refs.autocompleteAddress)
    // }
    //
    // window.requestAnimationFrame(waitForGoogleMaps.bind(this))
  },

  mounted () {
    window[Symbol.for('global.addressData')] = {
      address: '',
      coordinates: null,
      addressComponents: {},
      url: null
    }

    createAutocomplete(this.$refs.autocompleteAddress)
  }
}
</script>

<style scoped>

.input-field {
  display: inline-block;
  outline: none;
  width: 480px;
  margin: 0 16px;
  padding: 8px 16px;
  border: solid 1px #bbb;
  border-radius: 4px;
}
.input-field:focus {
  outline: none;
  border: solid 1px #09b;
}
</style>
