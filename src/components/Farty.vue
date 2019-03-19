<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1>Feed Patrick!</h1>
        <h2>click on some food to feed his face</h2>
        <h3>Try different combinations</h3>
        <!-- <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img> -->
        <draggable
          class="mouth"
          v-model="inMouth"
          :group="{name: 'eating', pull: false,put:true}"
          @change="onChange"
        >
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

      <v-layout column align-center="true">
      <v-flex v-model="foodBag" >
        <v-btn    class="foodItem"
            v-for="element in foodBag"
            :key="element.name"
            contain
            @click="onTriggerEatFood(element.foodObj)">
            {{element.name}}
        </v-btn>
         <!-- <v-img
            class="foodItem"
            v-for="element in foodBag"
            :key="element.name"
            :src="element.file"
            contain
            height="64"
            width="64"
            @click="onTriggerEatFood(element.foodObj)"
          ></v-img> -->
        <!-- <draggable
          class="foodBag"
          v-model="foodBag"
          :group="{ name: 'food', pull:'clone', put: false}"
        >
          <v-img
            class="foodItem"
            v-for="element in foodBag"
            :key="element.name"
            :src="element.file"
            contain
            height="64"
            width="64"
          ></v-img>
          <!-- <div v-for="element in foodBag" :key="element.id">{{element.name}}</div>
        </draggable> -->
      </v-flex>
      </v-layout>

      <v-flex mb-5 xs12>
        <audio id="audio1" volume="1.0" ></audio>
        <audio id="audio2" volume="1.0" ></audio>
        <audio id="audio3" volume="1.0" ></audio>
        <audio id="audio4" volume="1.0" ></audio>
        <audio id="audio5" volume="1.0" ></audio>
        <audio id="audio6" volume="1.0" ></audio>
        <audio id="audio7" volume="1.0" ></audio>
        <audio id="audio8" volume="1.0" ></audio>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'


// import snd1 from "./assets/sounds/fart-c.mp3"
// import snd2 from "./assets/sounds/fart-01.mp3"
// import snd3 from "./assets/sounds/fart-02.mp3"
// import snd4 from "./assets/sounds/fart-03.mp3"
// import snd5 from "./assets/sounds/fart-04.mp3"
// import snd6 from "./assets/sounds/fart-05.mp3"
// import snd7 from "./assets/sounds/fart-06.mp3"

import { Food } from '../lib/Food'
import { FartComponent } from '../lib/FartComponent'
import { Anus } from '../lib/Anus'
import { Gut } from '../lib/Gut'
import { ILog } from '../lib/ILog'
import { Dictionary } from 'vue-router/types/router'
import { mapMutations } from 'vuex';
import { BasicLogger } from '../lib/BasicLogger'

// We declare the props separately
// to make props types inferable.
// const AppProps = Vue.extend({
//   props: {
//     propMessage: String
//   }
// })

@Component({
  components: {
    draggable
  },
  methods: mapMutations([
    'mounted',
    'onChange',
    'onAdd',
    'onClone'
  ])
})
export default class Farty extends Vue {
  @Prop() private msg!: string
  audioContext!:AudioContext
  isChewing: boolean = false
  foodBag: Array<any> = [
    {
      id: 'food1',
      name: 'chicken',
      file: require("../assets/chicken.svg"),
      foodObj: new Food('bread', 'bread1', 'audio', 15, 0, 0, 2)
    },
    {
      id: 'food2',
      name: 'hamburger',
      file: require("../assets/hamburger.svg"),
      foodObj: new Food('MEAT', 'meat1', 'audio', 0, 15, 0, 2)
    },
    {
      id: 'food3',
      name: 'cheese',
      file: require("../assets/cheese.svg"),
      foodObj: new Food('MEAT', 'meat1', 'audio', 0, 0, 15, 2)
    }
  ]

  isAudioInitialized: boolean = false

  inMouth: Array<any> = []

  _log: ILog = new BasicLogger();

  _anus!: Anus
  _gut!: Gut
  digestionInterval: any


  fartComponents: Array<FartComponent> = [
    new FartComponent('f1', 0, 0, 10,[require('../assets/sounds/fart-c.mp3')]),
    new FartComponent('f2', 1, 4, 5, [require('../assets/sounds/fart-01.mp3')]),
    new FartComponent('f3', 5, 2, 3, [require('../assets/sounds/fart-02.mp3')]),
    new FartComponent('f4', 5, 3, 2, [require('../assets/sounds/fart-03.mp3')]),
    new FartComponent('f5', 3, 3, 4, [require('../assets/sounds/fart-04.mp3')]),
    new FartComponent('f6', 5, 0, 5, [require('../assets/sounds/fart-05.mp3')]),
    new FartComponent('f7', 0, 10, 0,[require('../assets/sounds/fart-06.mp3')])

    // new FartComponent('f1', 0, 0, 10,[require('../assets/sounds/fart-c.wav')]),
    // new FartComponent('f2', 1, 4, 5, [require('../assets/sounds/fart-01.wav')]),
    // new FartComponent('f3', 5, 2, 3, [require('../assets/sounds/fart-02.wav')]),
    // new FartComponent('f4', 5, 3, 2, [require('../assets/sounds/fart-03.wav')]),
    // new FartComponent('f5', 3, 3, 4, [require('../assets/sounds/fart-04.wav')]),
    // new FartComponent('f6', 5, 0, 5, [require('../assets/sounds/fart-05.wav')]),
    // new FartComponent('f7', 0, 10, 0,[require('../assets/sounds/fart-06.wav')])

]

  // fartSounds: Array<any> = [
  //   require('../assets/sounds/fart-c.mp3'),
  //   require('../assets/sounds/fart-01.mp3'),
  //   require('../assets/sounds/fart-02.mp3'),
  //   require('../assets/sounds/fart-03.mp3'),
  //   require('../assets/sounds/fart-04.mp3'),
  //   require('../assets/sounds/fart-05.mp3'),
  //   require('../assets/sounds/fart-06.mp3')
  // ]

  // foods: Dictionary<Food> = {
  //   food1: new Food('bread', 'bread1', 'audio', 5, 0, 0, 1),
  //   food2: new Food('MEAT', 'meat1', 'audio', 0, 5, 0, 1),
  //   food3: new Food('MEAT', 'meat1', 'audio', 0, 0, 5, 1),
  //   food4: new Food('MEAT', 'meat1', 'audio', 5, 5, 0, 1),
  //   food5: new Food('MEAT', 'meat1', 'audio', 0, 5, 5, 1),
  //   food6: new Food('MEAT', 'meat1', 'audio', 5, 5, 5, 1),
  //   food7: new Food('MEAT', 'meat1', 'audio', 5, 0, 5, 1)
  // }

  audioChannels: Dictionary<boolean> = {
    audio1: true,
    audio2: true,
    audio3: true,
    audio4: true,
    audio5: true,
    audio6: true,
    audio7: true,
    audio8: true
  }



  mounted() {
      if (this._anus) return;
      this._log = new BasicLogger();
      this._anus = new Anus({ log: this._log, playHandler: (fartComponent:FartComponent, delay) => {
          this._log.info("delay: " + delay)
          setTimeout(() => {
            let channel = this.getAudioChannel();
            channel = "#" + channel;
            this._log.info("play: " + fartComponent.getSoundId() + " on channel:" + channel);
            let audioElement
            audioElement = document.querySelector(channel);
            audioElement.setAttribute('src', fartComponent.getSoundId());
            audioElement.setAttribute('type', "audio/mp3");

            this.$store.dispatch('addLog', fartComponent.name)

            try {
              audioElement.play();
            } catch(err){
              this.$store.dispatch('addLog', err)
              this._log.error(err)
            }
          }, delay);
        }
      });

      this._gut = new Gut({ anus: this._anus, log: this._log, fartComponents: this.fartComponents });
      let self = this
      // not valid until _gut and _anus are created
      this.digestionInterval = setInterval(() => {
          self._gut
            .digestFood()
            // .then(() => {
            //   self._log.debug('digest pass complete')
            // })
            .catch(err => {
              self._log.error(err)
            })
        }, 100)


      console.log("************** view checked *********************")

      //setup audio channels
      for (let i = 1; i < 9; i++) {
        this.setupAudioChannel("#audio" + i, "audio" + i);
      }
  }

  onTriggerEatFood(foodObj){

    let vueComp = this
    if(!this.$data.isAudioInitialized){
      let ourWindow:any = window
      var AudioContext = ourWindow.AudioContext || ourWindow.webkitAudioContext;

      var context  = this.audioContext = new AudioContext();
      //if (context.state === 'suspended' && 'ontouchstart' in window)
      if (context.state === 'suspended' in window)
      {
          var unlock = function()
          {

              context.resume().then(function()
              {
                  document.body.removeEventListener('touchstart', unlock);
                  document.body.removeEventListener('touchend', unlock);
              });
          };

          document.body.addEventListener('touchstart', unlock, false);
          document.body.addEventListener('touchend', unlock, false);
      }

//       try{
//         this.$store.dispatch('addLog', "initialize audio")
//         let audioElement
//         audioElement= document.querySelector("#audio1")
//         //context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio2")
// //        context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio3")
// //        context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio4")
// //        context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio5")
//       //  context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio6")
//     //    context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio7")
//   //      context.createMediaElementSource(audioElement)
//         audioElement.pause()
//         audioElement = document.querySelector("#audio8")
// //        context.createMediaElementSource(audioElement)
//         audioElement.pause()
//       }catch(err){
//         this.$store.dispatch('addLog', err)
//       }

       this.$data.isAudioInitialized = true
    }

    this.$store.dispatch('addLog', "state: "+ context.state)

    this.$data.isChewing = true
    setTimeout(() => {
      this.$data.isChewing = false
    }, 3000)

    this.eatFood(foodObj)

  }


  onChange(event) {
    //todo:add food to digestion system.
    this.$data.isChewing = true
    setTimeout(() => {
      this.$data.isChewing = false
    }, 3000)

    this.eatFood(event.added.element.foodObj)

  }
  onAdd(event) {
  }

  onClone(/**Event*/ evt) {
  }

  getAudioChannel() {
    for (let a in this.$data.audioChannels) {
      if (this.$data.audioChannels[a]) {
        this.$data.audioChannels[a] = false
        return a
      }
    }
    //todo: we need to implement a wait for audio channel.. or maybe we just overwrite like we are doing here. on channel 1.
    return 'audio1'
  }

  returnAudioChannel(id){
    this.$data.audioChannels[id] = true
  }

  eatFood(foodObj) {
    this._gut.eatFood(foodObj.getClone())
  }

  setupAudioChannel(domId, name) {
    let ele = document.querySelector(domId)
    ele.onended = () => {
      this.returnAudioChannel(name)
    }
  }

}

</script>

<style>
.foodItem {
  display: flex;
  float: left;
}
.foodBag {
  display: inline-flex;
}
.mouth {
  display: inline-flex;
}
.sortable-ghost {
  display: none;
}
</style>
