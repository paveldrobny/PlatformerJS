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

  getScale() {
    return (this.width * 1) / this.width;
  }

  resize(canvas, context, canvasWidth, canvasHeight) {
    const EDITOR_LEFT_PANEL = 230;
    const EDITOR_TOP_PANEL = 45;
    const EDITOR_CANVAS_SPACE = 6;

    if (editorOptions.enabled) {
      canvasWidth = window.innerWidth - EDITOR_LEFT_PANEL - EDITOR_CANVAS_SPACE;
      canvasHeight =
        window.innerHeight - EDITOR_TOP_PANEL - EDITOR_CANVAS_SPACE * 2;
    } else {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
    }

    if (canvasHeight < canvasWidth / this.aspectRatio) {
      canvasWidth = canvasHeight * this.aspectRatio;
    } else canvasHeight = canvasWidth / this.aspectRatio;

    canvas.width = this.width;
    canvas.height = this.height;
    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;

    if (editorOptions.enabled) {
      canvas.style.top = `${
        canvasHeight / 2 + EDITOR_TOP_PANEL + EDITOR_CANVAS_SPACE
      }px`;
      canvas.style.left = `${canvasWidth / 2 + EDITOR_CANVAS_SPACE / 2}px`;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      return;
    }
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
  }
}
