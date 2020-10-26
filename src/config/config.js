import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 480,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      },
      debug: true,
    },
  },
};
