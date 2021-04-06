<template>
  <v-app>
    <v-main>
      <Home />
    </v-main>
  </v-app>
</template>

<script>

import 'dgtek-styles'

export default {
  name: 'App',

  components: {
    Home: () => import('@/views/Home')
  }
}
</script>

<style>
.theme--light.v-list-item .v-list-item__mask {
  color: #83332C !important;
  background: transparent !important;
}

* {
  outline: none!important;
  user-select: none!important;
}
</style>
