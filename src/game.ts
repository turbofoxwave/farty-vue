import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PlayScene from './scenes/PlayScene';

export default class GameLaunch {

    public static launch() {
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
                mode: Phaser.Scale.FIT,
                width: 300,
                height: 200,
                parent: 'game-container',
            },
            scene: [BootScene, PlayScene],
            transparent: true,

        });


        return game;
    }
}
