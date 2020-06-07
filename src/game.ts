import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PlayScene from './scenes/PlayScene';

export default class GameLaunch {

  public static launch() {
    // for ref: https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      // physics: {
      //     default: 'arcade',
      //     arcade: {
      //         gravity: { y: 300 },
      //         debug: false,
      //     },
      // },
      scale: {
        mode: Phaser.Scale.NONE,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 350,
        height: 300,
        parent: 'game-container',
      },
      scene: [BootScene, PlayScene],
      transparent: true,

    });


    return game;
  }
}
