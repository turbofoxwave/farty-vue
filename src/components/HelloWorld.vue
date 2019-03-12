<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <!-- <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img> -->
        <draggable class="mouth" v-model="inMouth" :group="{name: 'eating', pull: false,put:true}" @change="onChange">
        <v-img
          v-if="isChewing === false"
          :src="require('../assets/still.png')"
          class="my-3"
          contain
          height="200"
          width="200"
        ></v-img>
        <v-img
          v-if="isChewing === true"
          :src="require('../assets/chewing.gif')"
          class="my-3"
          contain
          height="200"
          width="200"
        ></v-img>
        </draggable>
        
      </v-flex>

      <v-flex mb-4>
        <v-content>
          <h2>foods</h2>
        </v-content>
        <draggable class="foodBag" v-model="foodBag" :group="{ name: 'food', pull:'clone', put: false}">
          <v-img class="foodItem" v-for="element in foodBag" :key="element.name" :src="element.file" contain height="64" width="64"></v-img>
          <!-- <div v-for="element in foodBag" :key="element.id">{{element.name}}</div> -->
        </draggable>
      </v-flex>

      <v-flex mb-5 xs12></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import chicken from "../assets/chicken.svg"
import cheese from "../assets/cheese.svg"
import hamburger from "../assets/hamburger.svg"

export default {
  data: () => ({
    isChewing: false,
    foodBag: [
      { name: "chicken", file: chicken },
      { name: "hamburger", file: hamburger },
      { name: "cheese", file: cheese },
    ],
    inMouth:[],
  }),
  components: {
    draggable
  },
  methods:{
    onChange: function(event){
      //todo:add food to digestion system.
      //this.inMouth.pop()

      this.isChewing = true
      setTimeout(()=>{
        this.isChewing = false
      }, 3000)

      console.log(event)
    },
    onAdd: function(event){
      //this.inMouth.pop()
      console.log(event)
    },
	  onClone: function (/**Event*/evt) {
      var origEl = evt.item;
      var cloneEl = evt.clone;
      console.log(origEl)
      console.log(cloneEl)
    },
  }
}
</script>

<style>
.foodItem{
  display:flex;
  float:left;
}
.foodBag{
  display:inline-flex;
}
.mouth{
  display:inline-flex;
}
.sortable-ghost{
  display:none;
}
</style>
