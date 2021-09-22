<template>
  <v-card flat class="transparent py-8 mx-auto" max-width="960">
    <v-progress-linear
      :active="progress"
      :indeterminate="progress"
      absolute
      top
      color="buttons"
      style="margin-top: 48px"
    ></v-progress-linear>

    <v-stepper v-model="step" class="transparent pt-12" style="box-shadow: none;">
      <v-row justify="center">
        <v-btn text outlined @click="step=1" :style="{ borderColor: first, color: first }">
          Search in DB
        </v-btn>

        <v-btn text outlined @click="step=2" :style="{ borderColor: second, color: second }">
          Google autocomplete
        </v-btn>
      </v-row>

      <v-stepper-items>
        <v-stepper-content step="1" class="py-4">
          <v-card flat class="transparent text-center mx-auto py-4" min-width="700">
            <SearchInDB :submit.sync="submit" :process.sync="progress" />
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2" class="py-4">
          <v-card flat class="transparent text-center mx-auto py-4" max-width="800">
            <GoogleAutocomplete :submit.sync="submit" :process.sync="progress" />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-row justify="center">
      <v-card flat class="transparent text-center mx-auto" max-width="800">
        <v-row v-if="url" justify="center" align="center">
          <p @click="gotoExternalLink" style="cursor: pointer">
            <b class="mr-2">Look at the map</b>
            <v-icon>mdi-open-in-new</v-icon>
          </p>
        </v-row>
      </v-card>
    </v-row>
  </v-card>
</template>

<script>

import { clearAddressData } from '@/helpers'
import SearchInDB from '@/components/SearchInDB.vue'
import GoogleAutocomplete from '@/components/GoogleAutocomplete'

export default {
  name: 'DgtekGoogleAutocomplete',
  components: {
    SearchInDB,
    GoogleAutocomplete
  },
  data: () => ({
    step: 2,
    address: '',
    buildingId: null,
    location: null,
    coordinates: null,
    progress: false,
    submit: false,
    url: null
  }),

  computed: {
    first () {
      return this.step === 1 ? '#900' : '#999'
    },
    second () {
      return this.step === 2 ? '#900' : '#999'
    },
    third () {
      return this.step === 3 ? '#900' : '#999'
    }
  },

  methods: {
    gotoExternalLink () {
      window.open(window[Symbol.for('global.addressData')].url, '_blank')
    },
    getValues () {
      this.address = window[Symbol.for('global.addressData')].address
      this.coordinates = window[Symbol.for('global.addressData')].coordinates
      this.url = window[Symbol.for('global.addressData')].url
    },
    setAPIHost (event) {
      window[Symbol.for('api.host')] = event.detail.host
      console.warn('API host changed:', window[Symbol.for('api.host')])
    }
  },

  watch: {
    step (val) {
      clearAddressData()
      this.getValues()
    },
    submit (val) {
      if (!val) return
      this.getValues()

      window.dispatchEvent(new CustomEvent('new-address-data', {
        detail: window[Symbol.for('global.addressData')]
      }))

      this.submit = false
    }
  },

  mounted () {
    window[Symbol.for('api.host')] = window[Symbol.for('api.host')] ? window[Symbol.for('api.host')] : process.env.NODE_ENV === 'production' ? 'https://portal.dgtek.net' : 'https://dgtek-staging.herokuapp.com'
  }
}
</script>

<style>
h6 {
  font-size: 14px!important;
}
span {
  color: #09b;
}

.active {
  border-color: #900;
  color: #900;
}
</style>
