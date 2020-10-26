import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    this.add.image(240, 320, 'background');
    this.add.image(240, 320, 'platform').setScale(0.5);
  }
}
