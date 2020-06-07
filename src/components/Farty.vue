<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <h1>Feed Patrick!</h1>
        <!-- <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img> -->
        <!-- <draggable
          class="mouth"
          v-model="inMouth"
          :group="{name: 'eating', pull: false,put:true}"
          @change="onChange"
        > -->
        <!-- <v-card dard color = "gray"> -->
          <Game/>
        <!-- </v-card> -->
        <!-- </draggable> -->
      </v-flex>

      <v-layout column align-center="true">
      <v-flex v-model="foodBag" >
        <!-- <v-btn    class="foodItem"
            v-for="element in foodBag"
            :key="element.name"
            contain
            @click.native="onTriggerEatFood(element.foodObj)">
            {{element.name}}
        </v-btn> -->
        <!-- <v-btn    class="setup"
            contain
            @click.native="onSetup()">
            setup
        </v-btn> -->
         <v-img
            class="foodItem"
            v-for="element in foodBag"
            :key="element.name"
            :src="element.file"
            contain
            height="64"
            width="64"
            @click="onTriggerEatFood(element.foodObj)"
          ></v-img>

      </v-flex>
      <h2>click on some food to feed his face</h2>
      <h2>Try different combinations and Feed him lots!</h2>

      </v-layout>

      <v-flex mb-5 xs12>
        <audio id="audio1" volume="1.0" ></audio>
        <audio id="audio2" volume="1.0" ></audio>
        <audio id="audio3" volume="1.0" ></audio>
        <audio id="audio4" volume="1.0" ></audio>
        <audio id="audio5" volume="1.0" ></audio>
        <audio id="audio6" volume="1.0" ></audio>
        <audio id="audio7" volume="1.0" ></audio>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import man from './man.vue'


// import snd1 from "./assets/sounds/fart-c.mp3"
// import snd2 from "./assets/sounds/fart-01.mp3"
// import snd3 from "./assets/sounds/fart-02.mp3"
// import snd4 from "./assets/sounds/fart-03.mp3"
// import snd5 from "./assets/sounds/fart-04.mp3"
// import snd6 from "./assets/sounds/fart-05.mp3"
// import snd7 from "./assets/sounds/fart-06.mp3"

import Game from './Game.vue';
import { Food } from '../lib/Food';
import { FartComponent } from '../lib/FartComponent';
import { Anus } from '../lib/Anus';
import { Gut } from '../lib/Gut';
import { ILog } from '../lib/ILog';
import { Dictionary } from 'vue-router/types/router';
import { mapMutations } from 'vuex';
import { BasicLogger } from '../lib/BasicLogger';
import { UILogger } from "../lib/UILogger";
import { GutLevels } from '@/lib/GutLevels';
import  PlayScene  from '../scenes/PlayScene';
import Phaser from 'phaser';
// We declare the props separately
// to make props types inferable.
// const AppProps = Vue.extend({
//   props: {
//     propMessage: String
//   }
// })

let factor = 1

@Component({
  components: {
    draggable,
    man,
    Game,
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
      file: require("../assets/chicken.png"),
      foodObj: new Food('MEAT', 'meat1', 'audio', 15, 5, 0, 2)
    },
    {
      id: 'food2',
      name: 'hamburger',
      file: require("../assets/cheese-burger.png"),
      foodObj: new Food('SANDWICH', 'burger', 'audio', 7, 7, 7, 2)
    },
    {
      id: 'food3',
      name: 'cheese',
      file: require("../assets/pizza.png"),
      foodObj: new Food('CHEESE', 'cheese1', 'audio', 15, 5, 0, .5)
    },
    {
      id: 'food4',
      name: 'bread',
      file: require("../assets/bread.png"),
      foodObj: new Food('BREAD', 'bread1', 'audio', 0, 0, 20, .1)
    },
    {
      id: 'food5',
      name: 'butter',
      file: require("../assets/jar.svg"),
      foodObj: new Food('BUTTER', 'butter1', 'audio', 0, 15, 0, .5)
    }

  ]

  hasUnlock:boolean = false
  isAudioInitialized: boolean = false

  inMouth: Array<any> = []

  _log: ILog = new BasicLogger();

  _anus!: Anus
  _gut!: Gut
  digestionInterval: any



  fartComponents: Array<FartComponent> = [
    new FartComponent('f1', factor * 0, factor *0, factor *2,[require('../assets/sounds/fart-07.mp3')]),
    new FartComponent('f2', factor * 1, factor *4, factor *5, [require('../assets/sounds/fart-01.mp3')]),
    new FartComponent('f3', factor * 5, factor *2, factor *3, [require('../assets/sounds/fart-02.mp3')]),
    new FartComponent('f4', factor * 5, factor *3, factor *2, [require('../assets/sounds/fart-03.mp3')]),
    new FartComponent('f5', factor * 3, factor *3, factor *4, [require('../assets/sounds/fart-04.mp3')]),
    new FartComponent('f6', factor * 5, factor *0, factor *5, [require('../assets/sounds/fart-05.mp3')]),
    new FartComponent('f7', factor * 0, factor *5, factor *0,[require('../assets/sounds/fart-06.mp3')])

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
    audio7: true
  }



  mounted() {
      if (this._anus) return;
      let vueComp = this;

      let uiLogger = new UILogger();
      uiLogger.logFunc = function(msg:string){
         vueComp.$store.dispatch('addLog', msg);
      }

      //this._log = new BasicLogger();
      this._log = uiLogger;

      this._anus = new Anus({ log: this._log, playHandler: (fartComponent:FartComponent, delay:number) => {
          this._log.info("delay: " + delay)

          //trigger audio output for fart release and animations
          setTimeout(() => {
            let channel = this.getAudioChannel();
            channel = "#" + channel;
            this._log.info("play: " + fartComponent.getSoundId() + " on channel:" + channel);
            let audioElement
            audioElement = document.querySelector(channel);
            audioElement.setAttribute('src', fartComponent.getSoundId());
            audioElement.setAttribute('type', "audio/mp3");

            // let source = this.$data.audioContext.createMediaElementSource(audioElement)
            // source.connect(this.$data.audioContext.destination)


            this.$store.dispatch('addLog', fartComponent.name + " " + this.$data.audioContext.state)

            try {
              audioElement.play().catch(err =>{
                vueComp.$store.dispatch('addLog', err)
              })
            } catch(err){
              this.$store.dispatch('addLog', err)
              this._log.error(err)
            }

            //hack: delay a smidge to align animation better with audio.
            setTimeout(()=>{
              let game:Phaser.Game =  this.$store.getters.getGame;
              let scene:PlayScene = game.scene.getScene('PlayScene');
              setTimeout( () =>{
                scene.playDizzy();
                scene.emitFartGas();
              },500);

            },0)

          }, delay);
        }
      });
      let self = this

      this._gut = new Gut({ anus: this._anus, log: this._log, fartComponents: this.fartComponents });
      this._gut.addListener('gut-change', (evt:any) =>{
        // fixme: type weak
        self.$store.dispatch('addGutLevels', new GutLevels(evt.detail.fatty,evt.detail.solid,evt.detail.fiber));
      })
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
      for (let i = 1; i < 8; i++) {
        this.setupAudioChannel("#audio" + i, "audio" + i);
      }


  }

  async initializeAudio(){
    let vueComp = this

    if(this.$data.isAudioInitialized) return

    let ourWindow:any = window
    var AudioContext = ourWindow.AudioContext || ourWindow.webkitAudioContext || ourWindow.mozAudioContext;

    var context  = this.$data.audioContext = new AudioContext();
  //   context.suspend().then( () =>{
    //if (context.state === 'suspended' && 'ontouchstart' in window)
    // vueComp.$store.dispatch('addLog', "suspend")
// try{
//     //await context.suspend()
// } catch(err){
//   console.log(err)
// }

    if (context.state !== 'suspended') return

            // //context.resume()
            // var unlock = function()
            // {
            //     vueComp.$store.dispatch('addLog', "unlock calling")

    console.log("1")
    await context.resume()

    try{
      vueComp.$store.dispatch('addLog', "initialize audio")

      let audioElement1= document.querySelector("#audio1") as any;
      let source1 = context.createMediaElementSource(audioElement1)
      source1.connect(context.destination)
      audioElement1.play()
      audioElement1.pause()

      let audioElement2 = document.querySelector("#audio2") as any;
      let source2 = context.createMediaElementSource(audioElement2)
      source2.connect(context.destination)
      audioElement2.play()
      audioElement2.pause()

      let audioElement3 = document.querySelector("#audio3") as any;
      let source3 = context.createMediaElementSource(audioElement3)
      source3.connect(context.destination)
      audioElement3.play()
      audioElement3.pause()

      let audioElement4 = document.querySelector("#audio4") as any;
      let source4 = context.createMediaElementSource(audioElement4)
      source4.connect(context.destination)
      audioElement4.play()
      audioElement4.pause()

      let audioElement5 = document.querySelector("#audio5") as any;
      let source5 = context.createMediaElementSource(audioElement5)
      source5.connect(context.destination)
      audioElement5.play()
      audioElement5.pause()

      let audioElement6 = document.querySelector("#audio6") as any;
      let source6 = context.createMediaElementSource(audioElement6)
      source6.connect(context.destination)
      audioElement6.play()
      audioElement6.pause()

      let audioElement7 = document.querySelector("#audio7") as any;
      let source7 = context.createMediaElementSource(audioElement7)
      source7.connect(context.destination)
      audioElement7.play()
      audioElement7.pause()

      vueComp.$store.dispatch('addLog', "unlocked")


    }catch(err){
      vueComp.$store.dispatch('addLog', err)
    }

    this.$data.isAudioInitialized = true
  }

  onTriggerEatFood(foodObj){
      this.initializeAudio().then( ()=>{

        this.$store.dispatch('addLog', "state: "+ this.$data.audioContext.state)

        let game:Phaser.Game =  this.$store.getters.getGame;
        let scene:PlayScene = game.scene.getScene('PlayScene');
        scene.playChomp();

        // this.$data.isChewing = true
        // setTimeout(() => {
        //   this.$data.isChewing = false
        // }, 3000)

        this.eatFood(foodObj)

      })
      .catch(err =>{
        console.error(err)
      })

  }


  onChange(event) {
    //todo:add food to digestion system.
    // this.$data.isChewing = true
    // setTimeout(() => {
    //   this.$data.isChewing = false
    // }, 3000)

    // this.eatFood(event.added.element.foodObj)

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
.my-3{
  z-index: 0;
  position: relative;
  top:0;
  left:0;
  margin:0px !important;
}
.my-4{
  z-index:1;
  position: absolute;
  top:5;
  left:250;
  margin:0px !important;
}


</style>
