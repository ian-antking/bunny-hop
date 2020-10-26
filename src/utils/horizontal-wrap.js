export default (sprite, scene) => {
  const halfWidth = sprite.displayWidth * 0.5;
  const gameWidth = scene.scale.width;
  
  if (sprite.x < -halfWidth) {
    sprite.x = gameWidth + halfWidth;
  } else if (sprite.x > gameWidth + halfWidth) {
    sprite.x = -halfWidth;
  }
};
