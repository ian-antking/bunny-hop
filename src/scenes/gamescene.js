import 'phaser';
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    this.add.image(240, 320, 'background')
      .setScrollFactor(1, 0);

    this.platforms = this.physics.add.staticGroup();
    
    for (let i = 0; i < 5; i+=1) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      const platform = this.platforms.create(x, y, 'platform');
      platform.setScale(0.5);

      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.5);
    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
    }

    this.platforms.children.iterate(platform => {
      const scrollY = this.cameras.main.scrollY;

      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
      }
    });

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }
  }
}
