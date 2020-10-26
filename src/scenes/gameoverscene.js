import 'phaser';
import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.text(width * 0.5, height * 0.5, 'Game Over', {
      fontSize: 48
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('Game');
    });
  }
}
