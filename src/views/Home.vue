<template>
  <v-container class="homefone">
    <!-- <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>
    </v-row> -->

    <InputAddress
          :id.sync="addressId"
          :value.sync="address"
    />

    <v-row>
      <v-col cols="12" md="6">
        <v-expansion-panels v-if="addressId">
          <v-expansion-panel>
            <v-expansion-panel-header>
              Address details
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <AddressDetails
                    :addressId="addressId"
                    :relatedBuildingIds.sync="relatedBuildingIds"
                    v-if="addressId"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" md="6">
        <v-expansion-panels v-if="relatedBuildingIds.length > 0">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import InputAddress from '@/components/InputAddress.vue'
import AddressDetails from '@/components/AddressDetails.vue'
import ShowBuilding from '@/components/ShowBuilding.vue'

export default {
  name: 'Home',
  components: {
    InputAddress,
    AddressDetails,
    ShowBuilding
  },
  data: () => ({
    addressId: null,
    address: '',
    relatedBuildingIds: []
  }),
  watch: {
    relatedBuildingIds: {
      deep: true,
      immediate: true,
      handler (val) {
        // console.log(val)
      }
    }
  },
  methods: {
    //
  }
}
</script>
