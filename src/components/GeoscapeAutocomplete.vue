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

      <v-btn text @click="parseAddress" color="primary">
        SUBMIT
      </v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>

import { getGeoscapeVariants, getGeoscapeCoordinates } from '@/helpers'

export default {
  name: 'GeoscapeAutocomplete',

  props: ['value'],

  data: () => ({
    address: '',
    loading: false,
    search: null
  }),
  computed: {
    addresses () {
      return this.variants.map(item => item.address)
    }
  },

  methods: {
    async parseAddress () {
      this.loading = true
      this.$emit('update:value', window[Symbol.for('global.addressData')].address)
    }
  }
}
</script>
