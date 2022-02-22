/**
 * PlayScene.js - at some point I need to tackle getting phaser type definitions working and switching this to a typescript file.
 */


import { Scene } from 'phaser'
export default class PlayScene extends Scene {

  constructor () {
    super({ key: 'PlayScene' })

    this.patrick = null;
    this.patrickMouth = null;
    this.patrickEyes = null;
    this.foodBits = null;
    this.fartCloudEmitter = null;
  }

  create () {

    this.fartCloudEmitter = this.add.particles('fart-cloud-1')
    .createEmitter({
      x:140,
      y:150,
      speed: { min: 20, max:50},
      scale: {start: .2, end: .2},
      angle: { min: -120, max: -80},
      lifespan: {min: 3500, max: 3000}
    })

    this.fartCloudEmitter.stop();


    let patrick = this.patrick = this.add.sprite(160,150,'patrick',0)
    patrick.scaleX = .6;
    patrick.scaleY = .6;

    patrick.setInteractive()

    let patrickEyes = this.patrickEyes = this.add.sprite(240,80, 'patrick-eyes', 29)
    patrickEyes.scaleX = .30
    patrickEyes.scaleY = .30

    let patrickMouth = this.patrickMouth = this.add.sprite(245,135, 'patrick-mouth',5)
    patrickMouth.scaleX = .3
    patrickMouth.scaleY = .3

    let foodBits = this.foodBits = this.add.sprite(245,135,'food-bits',0)
    foodBits.scaleX = .45
    foodBits.scaleY = .45
    foodBits.visible = false;

    //setup animations
    let configChomp = {
      key: 'patrick-chomp',
      frames: this.anims.generateFrameNumbers('patrick-mouth', { start: 0, end: 4, first: 4 }),
      frameRate: 24,
      repeat: 5,
      repeatDelay: 2
    };
    this.anims.create(configChomp);

    let configMouthClosed = {
      key: 'patrick-mouth-closed',
      frames: this.anims.generateFrameNumbers('patrick-mouth', { start: 5, end: 5, first: 5 }),
      frameRate: 24,
      repeat: 0,
      repeatDelay: 2
    };
    this.anims.create(configMouthClosed);


    let googlyEyes = {
      key: 'patrick-eyes-googly',
      frames: this.anims.generateFrameNumbers('patrick-eyes', { start: 0, end: 28, first: 0 }),
      frameRate: 30,
      repeat: 3,
      repeatDelay: 2
    };
    this.anims.create(googlyEyes);

    let plainEyes = {
      key: 'patrick-eyes-plain',
      frames: this.anims.generateFrameNumbers('patrick-eyes', { start: 29, end: 29, first: 29 }),
      frameRate: 20,
      repeat: 0,
      repeatDelay: 2
    };
    this.anims.create(plainEyes);

    let foodBitsAnim = {
      key: 'food-bits',
      frames: this.anims.generateFrameNumbers('food-bits', { start: 0, end: 3, first: 0}),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 2
    };
    this.anims.create(foodBitsAnim);
  }

  update () {
  }

  playChomp(){

    let self = this

    if(self.patrickMouth.anims.isPlaying || self.foodBits.anims.isPlaying) return
    self.foodBits.visible = true;

    self.foodBits.anims.play("food-bits")


    this.patrickMouth.anims.playAfterDelay("patrick-chomp", 1)
    .on('animationcomplete', function(animation, frame){
      if(animation.key === 'patrick-chomp'){
        this.foodBits.visible = false;
        this.foodBits.anims.stop();
      }

    },this)
    .anims.chain('patrick-mouth-closed');

  }

  playDizzy(){
    this.patrickEyes.anims.playAfterDelay("patrick-eyes-googly", 1)
    .anims.chain('patrick-eyes-plain')
  }

  emitFartGas(){
    this.fartCloudEmitter.emitParticle(3)
  }

}
