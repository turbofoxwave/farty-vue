import { Scene } from 'phaser'
import sky from '../assets/sky.png'
import bomb from '../assets/bomb.png'
import thudMp3 from '../assets/thud.mp3'
import thudOgg from '../assets/thud.ogg'
import pete from '../assets/pete.png'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('sky', sky)
    this.load.image('bomb', bomb)
    this.load.audio('thud', [thudMp3, thudOgg])
    this.load.spritesheet('chomp', pete, { frameWidth: 313, frameHeight: 451, endFrame: 23 });

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
