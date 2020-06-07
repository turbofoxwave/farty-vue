<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Farty Vue - Use Chrome (pc/mac)</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid pa-3>
        <v-layout align-start fill-height v-bind="topLevelLayoutBinding">

          <v-flex farty pa-3 xs5 v-bind="fartyPanelBinding">
            <!-- <v-layout> -->
            <v-card dark color="gray">
              <Farty />
            </v-card>
            <!-- <v-card dard color = "gray">
          <Game/>
        </v-card> -->
            <v-card dark color="gray">
              <GutHistory />
            </v-card>

            <!-- </v-layout> -->
          </v-flex>

          <v-flex pa-3 xs6 sm6 v-bind="consolePanelBinding">
            <v-layout :class="this.$vuetify.breakpoint.smAndUp?'body-1':'small-console'" column>
              <v-card dark color="gray">
                <Console />
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
import GutHistory from './components/GutHistory'
// import Game from '@/components/Game'

export default {
  name: 'App',
  computed: {
    fartyPanelBinding () {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndUp) {
        binding['order-xs1'] = false
      } else {
        binding['order-xs1'] = true
      }
      return binding
    }
    , consolePanelBinding () {
      const binding = {}
      if (this.$vuetify.breakpoint.smAndUp) {
        binding['order-xs2'] = false
      } else {
        binding['order-xs2'] = true
      }
      return binding
    }

    , topLevelLayoutBinding () {
      const binding = {}

      if (this.$vuetify.breakpoint.smAndUp) {
        binding.row = true

      }
      else {
        binding.column = true
      }

      return binding
    }
  }
  , components: {
    Farty
    , Console
    , GutHistory
    // ,Game
  },
  data: () => ({
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
  })
}
</script>
<style lang="scss">
// body {
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0;
// }

.small-console {
  font-size: 10px;
}

.farty {
  /* max-width: 350px !important; */
  min-width: 350px !important;
  /* width: 350px !important; */
}
</style>