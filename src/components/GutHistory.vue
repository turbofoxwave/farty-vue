<template>
<v-container text-xs-center>
    <h4>Gut Levels</h4>
    <v-layout >
    <v-card color="#666666" width="250">
      <v-card-title>Fat</v-card-title>

      <!-- bug: https://github.com/vuejs/vue-class-component/issues/360 -->
      <!-- https://github.com/vuejs/vetur/issues/1105 -->
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

    <v-card color="#666666" width="250">
          <v-card-title>Fiber</v-card-title>
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

    <v-card color="#666666" width="250">
      <v-card-title>Solids</v-card-title>
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

@Component({
  components: {
  },
  methods: mapMutations([
  ])
})
export default class GutHistory extends Vue {
  @Prop() private msg!: string

  get gutFatLevels(){
      return this.$store.state.gutLevels.map( obj => obj.fatty);
  }

  get gutFiberLevels(){
      return this.$store.state.gutLevels.map( obj => obj.fiber);
  }

  get gutSolidLevels(){
      return this.$store.state.gutLevels.map( obj => obj.solid);
  }

}

</script>

<style>

</style>
