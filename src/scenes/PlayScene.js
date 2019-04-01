import { Scene } from 'phaser'


export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  create () {
    this.load.spritesheet('chomp', 'assets/pete.png', { frameWidth: 313, frameHeight: 451, endFrame: 23 });


    //this.add.image(400, 300, 'sky')

    const bomb = this.physics.add.image(400, 200, 'bomb')
    bomb.setCollideWorldBounds(true)
    bomb.body.onWorldBounds = true // enable worldbounds collision event
    bomb.setBounce(1)
    bomb.setVelocity(200, 20)

    this.sound.add('thud')
    this.physics.world.on('worldbounds', () => {
      this.sound.play('thud', { volume: 0.75 })
    })

    let configChomp = {
      key: 'pete-chomp',
      frames: this.anims.generateFrameNumbers('chomp', { start: 0, end: 24, first: 0 }),
      frameRate: 60,
      repeat: 1,
      repeatDelay: 2
    };

    this.anims.create(configChomp);

    var configStill = {
      key: 'pete-still',
      frames: this.anims.generateFrameNumbers('chomp', { start: 0, end: 0, first: 0 }),
      frameRate: 30,
      repeat: 0,
      repeatDelay: 2
    };

    this.anims.create(configStill);


    let peteChomp = this.add.sprite(100, 100, 'chomp', 0);
    peteChomp.setInteractive()
    peteChomp.scaleX = .5;
    peteChomp.scaleY = .5;

    peteChomp.on('pointerdown', function(pointer){
      if(peteChomp.anims.isPlaying === true && peteChomp.anims.getCurrentKey() === 'pete-chomp') return;

      peteChomp.anims.delayedPlay(1,"pete-chomp")
      .on('animationcomplete', function(animation, frame){
        peteChomp.anims.delayedPlay(1,"pete-still")
      },this)
    })

    // let peteStill = this.add.sprite(100, 100, 'still', 4);
    // peteStill.scaleX = .5;
    // peteStill.scaleY = .5;
    // peteStill.anims.delayedPlay(1,"pete-still")

  }

  update () {
  }
}
