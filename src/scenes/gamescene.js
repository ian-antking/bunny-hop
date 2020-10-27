import 'phaser';
import Carrot from '../sprites/carrot';
import horizontalWrap from '../utils/horizontal-wrap';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  addCarrotAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;

    const carrot = this.carrots.get(sprite.x, y, 'carrot');

    carrot.setActive(true);
    carrot.setVisible(true);

    this.add.existing(carrot);

    carrot.body.setSize(carrot.width, carrot.height);

    this.physics.world.enable(carrot);

    return carrot;
  }

  handleCollectCarrot(_, carrot) {
    this.carrots.killAndHide(carrot);
    this.physics.world.disableBody(carrot.body);
    this.carrotsCollected += 1;

    this.scoreText.setText(`Carrots: ${this.carrotsCollected}`);
  }

  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();

    return platforms.reduce((previousPlatform, currentPlatform) => {
      return  previousPlatform.y > currentPlatform.y ? previousPlatform : currentPlatform;
    });
  }

  init() {
    this.carrotsCollected = 0;
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

    this.player = this.physics.add.sprite(this.scale.width * 0.5, this.scale.height * 0.5, 'bunny-stand').setScale(0.5);
    this.physics.add.collider(this.platforms, this.player);

    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.carrots = this.physics.add.group({
      classType: Carrot,
    });
    
    this.physics.add.collider(this.platforms, this.carrots);

    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      null,
      this
    );

    const textStyle = { fill: '#000', fontSize: 24, fontFamily: 'sans-serif' };
    this.scoreText = this.add.text(this.scale.width * 0.5, 10, 'Carrots: 0', textStyle)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const touchingDown = this.player.body.touching.down;
    const bottomPlaform = this.findBottomMostPlatform();

    if (this.player.y > bottomPlaform.y + 200) {
      this.scene.start('GameOver', { score: this.carrotsCollected });
    }

    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.setTexture('bunny-jump');
    }

    if (this.player.body.velocity.y > 0) {
      this.player.setTexture('bunny-stand');
    }

    this.platforms.children.iterate(platform => {
      const scrollY = this.cameras.main.scrollY;

      if (platform.y >= scrollY + this.scale.height) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();
        this.addCarrotAbove(platform); 
      }
    });

    this.carrots.children.iterate(carrot => {
      const scrollY = this.cameras.main.scrollY;

      if (carrot.y >= scrollY + this.scale.height) {
        this.carrots.killAndHide(carrot);
        this.physics.world.disableBody(carrot.body); 
      }
    });

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    horizontalWrap(this.player, this);
  }
}
