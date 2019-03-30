<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <!-- todo add stuff to say -->
      </v-flex>
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
  ])
})
export default class Template extends Vue {
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

<style lang="scss">

</style>
