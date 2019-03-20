<template>
  <v-container grid-list-sm>
    <v-layout text-xs-left wrap>
      <v-flex>
          <h2>Messages</h2>
      </v-flex>
      <v-flex xs12>
          <v-flex v-for="(log,index) in logs" :key="index">
            <div><span class="line-label" >{{log.index}}:&nbsp;&nbsp;</span>{{log.msg}}</div>
            <v-divider></v-divider>
          </v-flex>
          <!-- <v-card>
              <v-card-text v-for="(log, index)  in logs" :key="index"> {{log}} </v-card-text>
              <v-card-text> this is where the messages display</v-card-text>
              <v-card-text> this is where the messages display</v-card-text>
              <v-card-text> this is where the messages display</v-card-text>
              <v-card-text> this is where the messages display</v-card-text>
          </v-card> -->
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
  ,computed:{
    logs(){
        return this.$store.state.logs
    }
  }
})
export default class Console extends Vue {
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
.line-label{
    color:yellow !important;
}
</style>
