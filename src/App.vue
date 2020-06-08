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
            <v-card dark color="gray">
              <Farty />
            </v-card>
            <v-card dark color="gray">
              <GutHistory />
            </v-card>
          </v-flex>

          <v-flex pa-3 xs6 sm6 v-bind="consolePanelBinding">
            <v-layout class="body-1" column>
              <v-card dark color="gray">
                <Console />
              </v-card>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Farty from './components/Farty'
import Console from './components/console'
import GutHistory from './components/GutHistory'
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  components: {
    Farty,
    Console,
    GutHistory
  }
})
export default class App extends Vue {
  get fartyPanelBinding () {
    const binding = {}
    if (this.$vuetify.breakpoint.smAndUp) {
      binding['order-xs1'] = false
    } else {
      binding['order-xs1'] = true
    }
    return binding
  }

  get consolePanelBinding () {
    const binding = {}
    if (this.$vuetify.breakpoint.smAndUp) {
      binding['order-xs2'] = false
    } else {
      binding['order-xs2'] = true
    }
    return binding
  }

  get topLevelLayoutBinding () {
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

</script>
<style lang="scss">
.small-console {
  font-size: 10px;
}

.farty {
  min-width: 350px !important;
}
</style>