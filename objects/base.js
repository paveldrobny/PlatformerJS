import { editorOptions } from "../global.js";

export default class ObjectBase {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.speed = 0;
    this.color = color;
    this.outlineSize = 6;
    this.outlineColor = "#00aeff";
    this.type = "none"
    this.isDraggable = false;
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.w, this.h);
  }

  selected(context) {
    if (this.isDraggable || editorOptions.selectedObj === this) {
      context.beginPath();
      context.lineWidth = 3;
      context.strokeStyle = this.outlineColor;
      context.rect(
        this.x - this.outlineSize / 2 - 3,
        this.y - this.outlineSize / 2 - 3,
        this.w + this.outlineSize + 6,
        this.h + this.outlineSize + 6
      );
      context.stroke();
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  collision(object) {
    if (
      this.x > object.x - this.w &&
      this.x < object.x + object.w &&
      this.y > object.y - this.h &&
      this.y < object.y + object.h
    ) {
      return true;
    }
  }

  collisionMouse(x, y) {
    return (
      this.x <= x && this.x + this.w >= x && this.y <= y && this.y + this.h >= y
    );
  }

  moveDirection(isForward) {
    isForward ? (this.x += this.speed) : (this.x -= this.speed);
  }
}
