<template>
  <v-container grid-list-sm>
    <v-layout text-xs-left wrap>
      <v-flex>
          <h2>Log - Level: {{getReadableLevel()}}</h2>
      </v-flex>
      <v-flex>
        <v-btn @click="applyLevelError()">Error</v-btn>
      </v-flex>
      <v-flex>
        <v-btn @click="applyLevelInfo()">Info</v-btn>
      </v-flex>
      <v-flex>
        <v-btn @click="applyLevelDebug()">Debug</v-btn>
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
import {LogLevel} from '../lib/LogLevel'

@Component
export default class Console extends Vue {

  @Prop() private msg!: string

  get logs(){
    return this.$store.state.logs
  }

  applyLevelError(){
    this.$store.dispatch('setLogLevel', LogLevel.ERROR);
  }
  applyLevelInfo(){
    this.$store.dispatch('setLogLevel', LogLevel.INFO);
  }
  applyLevelDebug(){
    this.$store.dispatch('setLogLevel', LogLevel.DEBUG);
  }

  getReadableLevel(){
    switch(this.$store.state.logLevel){
      case LogLevel.ERROR:
        return 'Error';
      case LogLevel.INFO:
        return 'Info';
      case LogLevel.DEBUG:
        return 'Debug';
    }
  }
}

</script>

<style>
.line-label{
    color:yellow !important;
}
</style>
