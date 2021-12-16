<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card flat class="transparent mx-auto my-4" max-width="800">
          <SimpleGoogleAutocomplete
            submit.sync="submitted"
            address.sync="address"
            coordinates.sync="coordinates"
            url.sync="url"
          />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import 'dgtek-styles'
import { loadGoogleMapsScript } from '@/helpers'

export default {
  name: 'App',

  components: {
    SimpleGoogleAutocomplete: () => import('@/views/SimpleGoogleAutocomplete.vue')
  },

  // data: () => ({
  //   submitted: false,
  //   address: '',
  //   coordinates: null,
  //   url: null
  // }),

  // watch: {
  //   submitted (val) {
  //     console.log('submitted: ', val)
  //     if (!val) return
  //     console.log(window[Symbol.for('global.addressData')])
  //     this.submitted = false
  //   },
  //   address (val) {
  //     console.log('ADDRESS: ', val)
  //     console.log(this.coordinates)
  //     console.log(this.url)
  //   },
  //   url (val) {
  //     console.log('ADDRESS: ', this.address)
  //     console.log(this.coordinates)
  //     console.log(val)
  //   }
  // },

  methods: {
    catchEvent (event) {
      console.log('EVENT:\n', event.detail)
    }
  },

  beforeMount () {
    loadGoogleMapsScript()
    window.addEventListener('address-selected', this.catchEvent)
  }
}
</script>

<style>
.theme--light.v-list-item .v-list-item__mask {
  color: #83332C !important;
  background: transparent !important;
}

* {
  outline: none!important;
  /* user-select: none!important; */
}

input, textarea {
  user-select: text;
  -webkit-user-select: text;
}
</style>
