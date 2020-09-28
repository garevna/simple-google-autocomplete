<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="DGtek Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="50"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://dgtek.net"
        target="_blank"
        text
      >
        <span class="mr-2">DGtek</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
.theme--light.v-list-item .v-list-item__mask {
  color: #83332C !important;
  background: transparent !important;
}
</style>

<script>

import 'dgtek-styles'

export default {
  name: 'App',

  components: {
    //
  },

  data: () => ({
    //
  })
}
</script>
