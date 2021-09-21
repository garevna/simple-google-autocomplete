<template>
  <v-row justify="center">
    <v-toolbar class="transparent" style="box-shadow: none">
      <v-toolbar-title>
        <h6>Search address</h6>
      </v-toolbar-title>
      <input
        ref="autocompleteAddress"
        class="input-field pa-4"
        v-model="address"
        placeholder="Address"
      />

      <v-btn text large @click="parseAddress" color="primary">
        SUBMIT
      </v-btn>
    </v-toolbar>
  </v-row>
</template>

<script>

import { createAutocomplete, clearAddressData, testAddressStatus, searchAddressInDB } from '@/helpers'

export default {
  name: 'GoogleAutocomplete',

  props: ['submit', 'process'],

  data: () => ({
    ready: false,
    address: ''
  }),

  methods: {
    async parseAddress () {
      this.$emit('update:process', true)
      await searchAddressInDB(window[Symbol.for('global.addressData')].address)

      if (window[Symbol.for('global.addressData')].buildingId) {
        this.$emit('update:process', false)
        this.$emit('update:submit', true)
        return
      }
      // if (!window[Symbol.for('global.addressData')].status) await testAddressStatus()
      await testAddressStatus()

      this.$emit('update:process', false)
      this.$emit('update:submit', true)
    }
  },
  mounted () {
    clearAddressData()
    this.address = ''
    createAutocomplete(this.$refs.autocompleteAddress)
    this.ready = true
  }
}
</script>

<style scoped>

.input-field {
  display: inline-block;
  outline: none;
  width: 560px;
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
