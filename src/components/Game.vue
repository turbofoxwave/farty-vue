<template>
  <div id="game-container" v-if="downloaded" />
  <div class="placeholder" v-else>
    Downloading ...
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import GameLaunch from '../game';

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
export default class Game extends Vue {

  //todo define data elements
  downloaded:boolean = false

  mounted() {
     Promise.resolve()
    .then( () =>{
      this.downloaded = true
      this.$nextTick(() => this.$store.dispatch('setGame', GameLaunch.launch()) );
    })
  }

  onChange(event) {

  }
  onAdd(event) {
  }

  onClone(/**Event*/ evt) {
  }

}

</script>

<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
