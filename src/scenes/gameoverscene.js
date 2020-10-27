import 'phaser';
import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.text(width * 0.5, height * 0.5, 'Game Over', {
      fontSize: 48,
      fontFamily: 'sans-serif'
    }).setOrigin(0.5);

    this.add.text(width * 0.5, (height * 0.3) * 2, `You collected ${this.score} carrots`, {
      fontFamily: 'sans-serif',
      fontSize: 24
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown_SPACE', () => {
      this.scene.start('Game');
    });
  }
}
