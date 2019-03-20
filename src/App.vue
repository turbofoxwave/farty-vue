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
  <v-container fluid pa-3>
    <v-layout align-start fill-height v-bind="topLevelLayoutBinding">
      <v-flex pa-3 xs5 v-bind="fartyPanelBinding">
        <!-- <v-layout> -->
        <v-card dark color = "gray">
          <Farty/>
        </v-card>
        <!-- </v-layout> -->
      </v-flex>

      <v-flex pa-3 xs6 sm6 v-bind="consolePanelBinding">
        <v-layout :class="this.$vuetify.breakpoint.smAndUp?'body-1':'small-console'" column>
          <v-card dark color = "gray" >
            <Console/>
          </v-card>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
  </v-content>

    <!-- <v-content>
      <v-layout align-center justify-center row fill-height>
      <Console/>
      <Farty/>

      </v-layout>
    </v-content> -->
  </v-app>
</template>

<script>
import Farty from './components/Farty'
import Console from './components/console'

export default {
  name: 'App',
  computed: {
    fartyPanelBinding(){
      const binding = {}
      if(this.$vuetify.breakpoint.smAndUp){
        binding['order-xs1'] = false
      } else{
        binding['order-xs1'] = true
      }
      return binding
    }
    ,consolePanelBinding(){
      const binding = {}
      if(this.$vuetify.breakpoint.smAndUp){
        binding['order-xs2'] = false
      } else{
        binding['order-xs2'] = true
      }
      return binding
    }

    ,topLevelLayoutBinding () {
      const binding = {}

      if (this.$vuetify.breakpoint.smAndUp){
        binding.row = true

      }
      else{
        binding.column = true
      }

      return binding
    }
  }
  ,components: {
    Farty
    ,Console
  },
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
  })
}
</script>
<style>
.small-console {
  font-size: 10px;
}

</style>