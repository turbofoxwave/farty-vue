/**
 * BootScene.js - at some point I need to tackle getting phaser type definitions working and asset inclusion to finalize switching this to a typescript file.
 */
import { Scene } from 'phaser'

import patrick from '@/assets/patrick-base_frame_0.png'
import patrickEyes from '@/assets/patrick-eyes.png'
import patrickMouth from '@/assets/patrick-mouth-chomp.png'
import foodBits from '@/assets/food-bits.png'
import fartCloud1 from '@/assets/fart-cloud-1.png'
import fartCloud2 from '@/assets/fart-cloud-2.png'
import fartCloud3 from '@/assets/fart-cloud-3.png'
import fartClouds from '@/assets/fart-clouds.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.spritesheet('patrick', patrick, { frameWidth: 540, frameHeight:443, endFrame :0});
    this.load.spritesheet('patrick-mouth', patrickMouth, { frameWidth: 256, frameHeight: 128, endFrame: 5 });
    this.load.spritesheet('patrick-eyes', patrickEyes, { frameWidth: 190, frameHeight: 64, endFrame: 29 });
    this.load.spritesheet('food-bits', foodBits, {frameWidth: 167, frameHeight: 163, endFrame: 3});

    this.load.image('fart-cloud-1', fartCloud1);
    this.load.image('fart-cloud-2', fartCloud2);
    this.load.image('fart-cloud-3', fartCloud3);

    this.load.spritesheet('fart-clouds', fartClouds, { frameWidth: 215, frameHeight: 150, endFrame: 3});

  }

  create () {
    this.scene.start('PlayScene')
  }
}
