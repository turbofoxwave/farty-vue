<template>
<v-container>
    <v-layout >
    <v-card width="250">
      <v-card-title>Fat Lvl</v-card-title>
      <v-flex>
        <v-sparkline
        :value="gutFatLevels"
        auto-draw
        height="30"
        width="100"
        line-width="1"
        type='trend'
        ></v-sparkline>
      </v-flex>
    </v-card>

    <v-card width="250">
          <v-card-title>Fiber Lvl</v-card-title>
      <v-flex>
        <v-sparkline
        :value="gutFiberLevels"
        auto-draw
        height="30"
        width="100"
        line-width="1"
        type='trend'
        ></v-sparkline>
      </v-flex>
    </v-card>

    <v-card width="250">
      <v-card-title>Solids Lvl</v-card-title>
      <v-flex>
        <v-sparkline
        :value="gutSolidLevels"
        auto-draw
        height="30"
        width="100"
        line-width="1"
        type='trend'
        ></v-sparkline>
      </v-flex>
    </v-card>
    </v-layout>
</v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapMutations } from 'vuex';

// We declare the props separately
// to make props types inferable.
// const AppProps = Vue.extend({
//   props: {
//     propMessage: String
//   }
// })

@Component({
  components: {
  },
  methods: mapMutations([
  ]),
  computed:{
      gutFatLevels(){
          return this.$store.state.gutLevels.map( obj => obj.fatty);
      },
      gutFiberLevels(){
          return this.$store.state.gutLevels.map( obj => obj.fiber);
      },
      gutSolidLevels(){
          return this.$store.state.gutLevels.map( obj => obj.solid);
      },
  }
})
export default class GutHistory extends Vue {
  @Prop() private msg!: string

  //todo define data elements

  mounted() {

  }

  onChange(event) {

  }
  onAdd(event) {
  }

  onClone(/**Event*/ evt) {
  }

}

</script>

<style>

</style>
