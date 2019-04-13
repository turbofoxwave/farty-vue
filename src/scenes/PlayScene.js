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
    // this.load.spritesheet('chomp', 'assets/pete.png', { frameWidth: 313, frameHeight: 451, endFrame: 23 });

    // this.load.spritesheet('chomp', 'assets/pete.png', { frameWidth: 313, frameHeight: 451, endFrame: 23 });


    //this.add.image(400, 300, 'sky')

    // const bomb = this.physics.add.image(400, 200, 'bomb')
    // bomb.setCollideWorldBounds(true)
    // bomb.body.onWorldBounds = true // enable worldbounds collision event
    // bomb.setBounce(1)
    // bomb.setVelocity(200, 20)

    // this.sound.add('thud')
    // this.physics.world.on('worldbounds', () => {
    //   this.sound.play('thud', { volume: 0.75 })
    // })

    // let bread = this.add.sprite(50,50,'bread',0)
    // bread.scaleX = .2;
    // bread.scaleY = .2;



    this.fartCloudEmitter = this.add.particles('fart-cloud-1')
    .createEmitter({
      //only if you pass in a sprite sheet
      //frame: { frames:[0,1,2], cycle: false},
      x:140,
      y:150,
      speed: { min: 20, max:50},
      scale: {start: .2, end: .2},
      angle: { min: -120, max: -80},
      lifespan: {min: 3500, max: 3000},
      //gravityY: -300

    })

    this.fartCloudEmitter.stop();


    let patrick = this.patrick = this.add.sprite(150,100,'patrick',0)
    patrick.scaleX = .45;
    patrick.scaleY = .45;

    patrick.setInteractive()

    let patrickEyes = this.patrickEyes = this.add.sprite(215,50, 'patrick-eyes', 29)
    patrickEyes.scaleX = .25
    patrickEyes.scaleY = .25

    let patrickMouth = this.patrickMouth = this.add.sprite(208,95, 'patrick-mouth',5)
    patrickMouth.scaleX = .2
    patrickMouth.scaleY = .2

    let foodBits = this.foodBits = this.add.sprite(200,95,'food-bits',0)
    foodBits.scaleX = .35
    foodBits.scaleY = .35
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
      repeat: 5,
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


    // let self = this
    // patrick.on('pointerdown', function(pointer){
    //   self.playChomp();
    // })


    // let configChomp = {
    //   key: 'pete-chomp',
    //   frames: this.anims.generateFrameNumbers('chomp', { start: 0, end: 24, first: 0 }),
    //   frameRate: 60,
    //   repeat: 1,
    //   repeatDelay: 2
    // };

    // this.anims.create(configChomp);

    // var configStill = {
    //   key: 'pete-still',
    //   frames: this.anims.generateFrameNumbers('chomp', { start: 0, end: 0, first: 0 }),
    //   frameRate: 30,
    //   repeat: 0,
    //   repeatDelay: 2
    // };

    // this.anims.create(configStill);


    // let peteChomp = this.add.sprite(100, 100, 'chomp', 0);
    // peteChomp.setInteractive()
    // peteChomp.scaleX = .5;
    // peteChomp.scaleY = .5;

    // peteChomp.on('chomp', function(){
    //   if(peteChomp.anims.isPlaying === true && peteChomp.anims.getCurrentKey() === 'pete-chomp') return;

    //   peteChomp.anims.delayedPlay(1,"pete-chomp")
    //   .on('animationcomplete', function(animation, frame){
    //     peteChomp.anims.delayedPlay(1,"pete-still")
    //   },this)
    // })

    // peteChomp.on('pointerdown', function(pointer){
    //   peteChomp.emit('chomp')
    // })

    // let peteStill = this.add.sprite(100, 100, 'still', 4);
    // peteStill.scaleX = .5;
    // peteStill.scaleY = .5;
    // peteStill.anims.delayedPlay(1,"pete-still")

  }

  update () {
  }

  playChomp(){

    let self = this

    //if(self.patrickMouth.isPlaying || self.foodBits.isPlaying) return
    self.foodBits.visible = true;

    self.foodBits.anims.play("food-bits")


    this.patrickMouth.anims.delayedPlay(1,"patrick-chomp")
    .on('animationcomplete', function(animation, frame){
      if(animation.key === 'patrick-chomp'){
        this.foodBits.visible = false;
        this.foodBits.anims.stop();
      }

    },this)
    .anims.chain('patrick-mouth-closed');

  }

  playDizzy(){
    this.patrickEyes.anims.delayedPlay(1,"patrick-eyes-googly")
    .anims.chain('patrick-eyes-plain')

  }

  emitFartGas(){
    //if(this.fartCloudEmitter.on) return;
    //this.fartCloudEmitter.flow(5,[5,3,2,1]);
    this.fartCloudEmitter.emitParticle(1)
    //this.fartCloudEmitter.explode()
  //   setTimeout(() =>{
  //  //   this.fartCloudEmitter.flow(-1,0)
  //   },100);
  }

}
