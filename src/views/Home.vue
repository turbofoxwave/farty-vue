<template>
  <div class="home">
    <Farty/>
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
