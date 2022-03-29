import { editorOptions } from "./global.js";

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

    if (editorOptions.enabled) {
      canvas.style.top = `${canvasHeight / 2 + 20}px`;
      canvas.style.left = `${canvasWidth / 2 - 110}px`;
      canvas.style.width = `${canvasWidth - 255}px`;
      canvas.style.height = `${canvasHeight - 50}px`;
      return;
    }
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
  }
}
