<template>
  <v-container class="homefone mb-12">

    <v-progress-linear
      :active="progress"
      :indeterminate="progress"
      absolute
      top
      color="buttons"
    ></v-progress-linear>

    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="80"
        />
      </v-col>
    </v-row>

    <v-stepper v-model="step" class="transparent mt-12" style="box-shadow: none;">
      <v-row justify="center">
        <v-btn text outlined @click="step=1" :style="{ borderColor: first, color: first }">
          Search in buildings DB
        </v-btn>

        <v-btn text outlined @click="step=2" :style="{ borderColor: second, color: second }">
          Google autocomplete
        </v-btn>

        <v-btn text outlined @click="step=3" :style="{ borderColor: third, color: third }">
          Geoscape only
        </v-btn>
      </v-row>
      <v-stepper-items>
        <v-stepper-content step="1" class="pb-12">
          <v-card flat class="transparent text-center mx-auto" max-width="800">
            <!-- <h4>Search the building in DB</h4> -->
            <BuildingsAddress :address.sync="address" />
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="2" class="pb-12">
          <v-card flat class="transparent text-center mx-auto" max-width="800">
            <!-- <h4>Google Maps Autocomplete</h4> -->
            <GoogleAutocomplete :value.sync="address" />
          </v-card>
        </v-stepper-content>

        <v-stepper-content step="3" height="320">
          <v-card flat class="transparent text-center mx-auto" max-width="800">
            <!-- <h4>Geoscape only</h4> -->
            <GeoscapeAutocomplete :value.sync="address" />
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <!-- <v-card flat class="transparent text-center mt-12 mx-auto" max-width="800">
      <h4>Search the building in DB</h4>
      <BuildingsAddress :address.sync="address" />
    </v-card> -->

    <!-- <v-card flat class="transparent text-center mt-12 mx-auto" max-width="800">
      <h4>Google Maps Autocomplete</h4>
      <GoogleAutocomplete :value.sync="address" />
    </v-card> -->

    <!-- <v-card flat class="transparent text-center mt-12 mx-auto" max-width="800">
      <h4>Geoscape only</h4>
      <GeoscapeAutocomplete :value.sync="address" />
    </v-card> -->

    <v-card flat class="transparent text-center mt-12 mx-auto" v-if="addressId" max-width="960">
      <v-card-text>
        <h4>Geoscape search for address data</h4>
      </v-card-text>

      <v-card-text text-center>
        <h4>{{ address || 'Not found' }}</h4>
      </v-card-text>
      <v-card-text>
        <p><small>Geoscape address id: {{ addressId }}</small></p>
      </v-card-text>
      <v-card-text>
        <p v-if="coordinates">lat: <span>{{ coordinates[1] }}</span>, lng: <span>{{ coordinates[0] }}</span></p>
      </v-card-text>

      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card flat class="transparent">
            <v-card-title>
              <h3>Address details</h3>
            </v-card-title>
            <v-expansion-panels v-if="addressId">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ address}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <AddressDetails
                    v-if="addressId"
                    :addressId="addressId"
                    :geolocation.sync="coordinates"
                    :relatedBuildingIds.sync="relatedBuildingIds"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat class="transparent">
            <v-card-title>
              <h3>Related buildings</h3>
            </v-card-title>
            <v-expansion-panels v-if="relatedBuildingIds && relatedBuildingIds.length > 0">
              <v-expansion-panel
                    v-for="(item, index) in relatedBuildingIds"
                    :key="index"
              >
                <v-expansion-panel-header>
                  {{ item }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <ShowBuilding :buildingId="item" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
    BuildingsAddress: () => import('@/components/BuildingsAddress.vue'),
    GeoscapeAutocomplete: () => import('@/components/GeoscapeAutocomplete.vue'),
    GoogleAutocomplete: () => import('@/components/GoogleAutocomplete'),
    AddressDetails: () => import('@/components/AddressDetails.vue'),
    ShowBuilding: () => import('@/components/ShowBuilding.vue')
  },
  data: () => ({
    step: 1,
    address: '',
    addressId: null,
    coordinates: null,
    relatedBuildingIds: [],
    progress: false
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
    async getCoordinates (id) {
      this.progress = true
      const response = await (await fetch(`https://api.psma.com.au/v1/addresses/${id}/geo`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_GEOSCAPE_KEY
        }
      })).json()

      const coords = response.geo.geometry.coordinates
      this.progress = false
      return { lat: coords[1], lng: coords[0] }
    },

    async getGeoscapeVariant (data) {
      var address = data || this.$refs.autocompleteAddress.value
      const index = address.indexOf(', Australia')
      address = index !== -1 ? address.slice(0, index) : address

      this.progress = true

      const response = (await (await fetch(`https://api.psma.com.au/v1/predictive/address?maxNumberOfResults=1&query=${encodeURIComponent(address)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_GEOSCAPE_KEY
        }
      })).json())

      this.progress = false

      return response && response.suggest ? response.suggest[0] : null
    }
  },
  watch: {
    address: {
      async handler (value) {
        const result = await this.getGeoscapeVariant(value)
        if (!result) {
          this.address = 'Not found'
          this.addressId = null
        }
        this.addressId = result.id
      }
    },
    coordinates: {
      deep: true,
      handler (val) {}
    },
    relatedBuildingIds: {
      deep: true,
      immediate: true,
      handler (val) {}
    }
  }
}
</script>

<style>
h6 {
  font-size: 14px!important;
}
span {
  font-size: 12px;
  color: #09b;
}

.active {
  border-color: #900;
  color: #900;
}
</style>
