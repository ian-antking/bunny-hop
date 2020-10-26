import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    this.add.image(240, 320, 'background');

    const platforms = this.physics.add.staticGroup();
    
    for (let i = 0; i < 5; i+=1) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      const platform = platforms.create(x, y, 'platform');
      platform.setScale(0.5);

      const body = platform.body;
      body.updateFromGameObject();
    }
  }
}
