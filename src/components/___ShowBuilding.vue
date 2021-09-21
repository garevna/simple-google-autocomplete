<template>
  <v-card flat class="transparent">
    <v-row justify="center">
      <v-simple-table dark>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Property
              </th>
              <th class="text-left">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prop in properties"
              :key="prop"
            >
              <td class="text-left" v-if="buildingData[prop]">{{ prop }}</td>
              <td class="text-left" v-if="buildingData[prop]">{{ buildingData[prop] }}</td>
            </tr>
            <tr>
              <td class="text-left">Footprint 2d</td>
              <td class="text-left">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Coordinates
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                          v-for="(point, index) in footprint2dCoordinates"
                          :key="index"
                    >
                      {{ point }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: '',
  props: ['buildingId'],
  data: () => ({
    buildingData: {},
    links: {},
    footprint2dCoordinates: []
  }),
  computed: {
    properties () {
      return Object.keys(this.buildingData)
    }
  },
  watch: {
    buildingId (val) {
      if (val) this.getBuildingDataById(val)
    }
  },
  methods: {
    async getBuildingDataById (id) {
      this.buildingData = await (await fetch(`https://api.psma.com.au/v1/buildings/${this.buildingId}?include=centroid,footprint2d,elevation,area,zonings,estimatedLevels`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.VUE_APP_GEOSCAPE_KEY
        }
      })).json()
      // this.buildingData.centroidCoordinates = JSON.parse(JSON.stringify(this.buildingData.centroid.point.coordinates))
      this.buildingData.centroidCoordinates = this.buildingData.centroid.point.coordinates
      delete this.buildingData.centroid
      this.buildingData.zonings = this.buildingData.zonings[0]
      this.footprint2dCoordinates = this.buildingData.footprint2d.coordinates[0][0]
      delete this.buildingData.footprint2d
      this.links = this.buildingData.links
      delete this.buildingData.links
      delete this.buildingData.messages
      delete this.buildingData.buildingId
      delete this.buildingData.relatedAddressIds
    }
  },
  mounted () {
    if (this.buildingId) this.getBuildingDataById(this.buildingId)
  }
}
</script>
