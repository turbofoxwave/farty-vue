import { Scene } from 'phaser'


export default class PlayScene extends Scene {

  constructor () {
    super({ key: 'PlayScene' })

    this.patrick = null;
    this.patrickMouth = null;
    this.patrickEyes = null;
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


    let patrick = this.patrick = this.add.sprite(150,100,'patrick',0)
    patrick.scaleX = .45;
    patrick.scaleY = .45;

    let patrickEyes = this.patrickEyes = this.add.sprite(215,50, 'patrick-eyes', 29)
    patrickEyes.scaleX = .25
    patrickEyes.scaleY = .25

    let patrickMouth = this.patrickMouth = this.add.sprite(208,95, 'patrick-mouth',5)
    patrickMouth.scaleX = .2
    patrickMouth.scaleY = .2

    patrick.setInteractive()



    //setup animations
    let configChomp = {
      key: 'patrick-chomp',
      frames: this.anims.generateFrameNumbers('patrick-mouth', { start: 0, end: 4, first: 4 }),
      frameRate: 30,
      repeat: 5,
      repeatDelay: 2
    };
    this.anims.create(configChomp);

    let configMouthClosed = {
      key: 'patrick-mouth-closed',
      frames: this.anims.generateFrameNumbers('patrick-mouth', { start: 5, end: 5, first: 5 }),
      frameRate: 30,
      repeat: -1,
      repeatDelay: 2
    };
    this.anims.create(configMouthClosed);


    let googlyEyes = {
      key: 'patrick-eyes-googly',
      frames: this.anims.generateFrameNumbers('patrick-eyes', { start: 0, end: 28, first: 0 }),
      frameRate: 60,
      repeat: 10,
      repeatDelay: 2
    };
    this.anims.create(googlyEyes);

    let plainEyes = {
      key: 'patrick-eyes-plain',
      frames: this.anims.generateFrameNumbers('patrick-eyes', { start: 29, end: 29, first: 29 }),
      frameRate: 30,
      repeat: -1,
      repeatDelay: 2
    };
    this.anims.create(plainEyes);


    let self = this
    patrick.on('pointerdown', function(pointer){
      self.playChomp();
    })


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
    this.patrickMouth.anims.delayedPlay(1,"patrick-chomp")
    .anims.chain('patrick-mouth-closed')
    // .on('animationcomplete', function(animation, frame){
    //   peteChomp.anims.(1,"pete-still")
    // },this)


  }

  playDizzy(){
    this.patrickEyes.anims.delayedPlay(1,"patrick-eyes-googly")
    .anims.chain('patrick-eyes-plain')

  }

}
