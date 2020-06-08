<template>
  <v-container grid-list-sm>
    <v-layout text-xs-left wrap>
      <v-flex>
          <h2>Log</h2>
      </v-flex>
      <v-flex xs12>
          <!-- bug: https://github.com/vuejs/vue-class-component/issues/360 -->
          <!-- https://github.com/vuejs/vetur/issues/1105 -->
          <v-flex v-for="(log,index) in logs" :key="index">
            <div><span class="line-label" >{{log.index}}:&nbsp;&nbsp;</span>{{log.msg}}</div>
            <v-divider></v-divider>
          </v-flex>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
/**
 * The Console component displays log messages.
 */

import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapMutations } from 'vuex';

@Component
export default class Console extends Vue {

  @Prop() private msg!: string

  get logs(){
    return this.$store.state.logs
  }
}

</script>

<style>
.line-label{
    color:yellow !important;
}
</style>
