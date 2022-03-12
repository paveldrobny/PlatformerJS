export default class GameManager {
  constructor() {
    this.width = 1280;
    this.height = 720;
    this.aspectRatio = 16 / 9;
  }

  area(player) {
    if (player.x + player.h < 0) player.x = this.width;
    if (player.x > this.width) player.x = -player.h;
    if (player.y > this.height - player.h) {
      player.isJump = false;
      player.y = this.height - player.h;
      player.velocityY = 0;
    }
  }

  resize(canvas, context, canvasWidth, canvasHeight) {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    if (canvasHeight < canvasWidth / this.aspectRatio) {
      canvasWidth = canvasHeight * this.aspectRatio;
    } else canvasHeight = canvasWidth / this.aspectRatio;

    canvas.width = this.width;
    canvas.height = this.height;
    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;

    canvas.style.width = `${canvasWidth - 250}px`;
    canvas.style.height = `${canvasHeight - 35}px`;
  }
}
