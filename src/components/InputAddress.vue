<template>
    <v-row class="text-center">
      <v-col
        class="my-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Check address
        </h2>

        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-autocomplete
                  v-model="address"
                  :loading="loading"
                  :items="addresses"
                  :search-input.sync="search"
                  cache-items
                  class="mx-4"
                  flat
                  hide-no-data
                  hide-details
                  label="Your address"
                  width="320"
                  outlined
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row justify="center" v-if="google || formula">
          <v-card flat class="transparent mx-auto">
            <h6>Distance from: [-37.87013628, 144.963058]</h6>
            <h6>Google: <span>{{ google }}</span></h6>
            <h6>Formula: <span>{{ formula }}</span></h6>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
</template>

<style scoped>
h6 {
  font-size: 14px!important;
}
span {
  color: #09b;
}
</style>

<script>
export default {
  name: 'InputAddress',

  props: ['id', 'value'],

  data: () => ({
    address: '',
    variants: [],
    loading: false,
    search: null,
    google: '',
    formula: ''
  }),
  computed: {
    addresses () {
      return this.variants.map(item => item.address)
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.getVariants(val)
    },
    address (val) {
      this.$emit('update:id', this.variants[0].id)
      this.$emit('update:value', this.variants[0].address)
      this.getCoordinates(this.variants[0].id)
        .then((point) => {
          const target = { lat: -37.87013628, lng: 144.963058 }
          this.google = Math.round(this.getDistance(new this.LatLng(point.lat, point.lng), new this.LatLng(target.lat, target.lng)))
          this.formula = this.calcDistance(point, target)
        })
    }
  },
  methods: {

    async getCoordinates (id) {
      const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${id}/geo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_API_KEY
        }
      })).json()
      const coords = response.geo.geometry.coordinates
      return { lat: coords[1], lng: coords[0] }
    },

    async getVariants (val) {
      if (val.length < 4) return
      this.loading = true
      this.variants = (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=20&query=${encodeURIComponent(val)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_API_KEY
        }
      })).json()).suggest
      this.loading = false
    }
  }
}
</script>
