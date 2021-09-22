<template>
  <v-row justify="center">
    <v-toolbar class="transparent" width="640" style="box-shadow: none">
      <v-toolbar-title>
        <h6>Select building</h6>
      </v-toolbar-title>

      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Start to enter the address"
        solo-inverted
      ></v-autocomplete>

      <v-btn text large @click="onSubmit" color="primary">
        SUBMIT
      </v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>

import { getBuildings, clearAddressData, searchAddressInDB } from '@/helpers'

export default {
  name: 'SearchInDB',

  props: ['submit', 'process'],

  data: () => ({
    loading: true,
    items: [],
    search: null,
    select: null,
    addresses: []
  }),

  methods: {
    async onSubmit () {
      this.$emit('update:process', true)
      window[Symbol.for('global.addressData')].address = this.select
      await searchAddressInDB(this.select)
      this.$emit('update:process', false)
      this.$emit('update:submit', true)
    },

    querySelections (value) {
      this.loading = true
      this.items = this.addresses.filter(item => (item || '').toLowerCase().indexOf((value || '').toLowerCase()) > -1)
      this.loading = false
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
    relatedBuildingIds: {
      deep: true,
      immediate: true,
      handler (val) {}
    }
  },
  async mounted () {
    this.loading = true
    this.addresses = await getBuildings()
    this.loading = false
    clearAddressData()
  }
}
</script>
