<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Farty msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Farty from '@/components/Farty.vue'; // @ is an alias to /src

@Component({
  components: {
    Farty,
  },
})
export default class Home extends Vue {}
</script>
