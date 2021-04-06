<template>
  <v-row justify="center">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-toolbar-title>
        <h6>Search address</h6>
      </v-toolbar-title>
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
        placeholder="Enter the address"
        outlined
      />

      <v-btn text @click="$emit('update:value', address)" color="primary">SUBMIT</v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>
export default {
  name: 'GeoscapeAutocomplete',

  props: ['value'],

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
    }
  },
  methods: {
    async getVariants (val) {
      if (val.length < 4) return
      this.loading = true
      this.variants = (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=20&query=${encodeURIComponent(val)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_GEOSCAPE_KEY
        }
      })).json()).suggest
      this.loading = false
    }
  }
}
</script>
