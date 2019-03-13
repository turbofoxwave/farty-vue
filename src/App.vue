<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Farty Vue</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
      </v-btn>
    </v-toolbar>

    <v-content>
      <Farty/>
    </v-content>
  </v-app>
</template>

<script>
import Farty from './components/Farty'

export default {
  name: 'App',
  components: {
    Farty
  },
  data () {
    return {
      //
    }
  }
}
</script>
