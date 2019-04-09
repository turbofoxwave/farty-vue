import { Scene } from 'phaser'
import sky from '../assets/sky.png'
import bomb from '../assets/bomb.png'
import thudMp3 from '../assets/thud.mp3'
import thudOgg from '../assets/thud.ogg'
import pete from '../assets/pete.png'

import patrick from '../assets/patrick-base_frame_0.png'
import patrickEyes from '../assets/patrick-eyes.png'
import patrickMouth from '../assets/patrick-mouth-chomp.png'

import bread  from '../assets/bread.svg'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    // this.load.image('sky', sky)
    // this.load.image('bomb', bomb)
    // this.load.audio('thud', [thudMp3, thudOgg])
    this.load.image('bread', bread)
    this.load.spritesheet('patrick', patrick, { frameWidth: 540, frameHeight:443, endFrame :0})
    this.load.spritesheet('patrick-mouth', patrickMouth, { frameWidth: 256, frameHeight: 128, endFrame: 5 });
    this.load.spritesheet('patrick-eyes', patrickEyes, { frameWidth: 256, frameHeight: 64, endFrame: 28 });
    // this.load.spritesheet('chomp', pete, { frameWidth: 313, frameHeight: 451, endFrame: 23 });

  }

  create () {
    this.scene.start('PlayScene')

    // for (var i = 0; i < 128; i++)
    // {
    //     var x = Phaser.Math.Between(0, 790);
    //     var y = Phaser.Math.Between(0, 590);

    //     var boom = this.add.sprite(x, y, 'boom', 23);

    //     boom.anims.delayedPlay(Math.random() * 3, 'explode');
    // }

  }
}
