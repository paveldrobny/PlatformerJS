import Object from "./base.js";
import GameManager from "../gameManager.js";
import { playerOptions } from "../global.js";

export default class Player extends Object {
  constructor(x, y, color) {
    super();
    this.x = x;
    this.y = y;
    this.w = playerOptions.size;
    this.h = playerOptions.size;
    this.speed = playerOptions.speed;
    this.gravity = 1.3;
    this.friction = 0.8;
    this.velocityX = 0;
    this.velocityY = 0;
    this.color = color;
    this.isJump = false;
    this.isGrounded = true;
  }

  draw(context) {
    super.draw(context);
  }

  collision(obj) {
    if (
      this.x + this.w < obj.x ||
      this.x > obj.x + obj.w ||
      this.y + this.h < obj.y ||
      this.y > obj.y + obj.h
    ) {
      return;
    }

    this.narrowPhase(obj);
  }

  narrowPhase(obj) {
    const objectBottom = Math.abs(this.y - (obj.y + obj.h));
    const objectLeft = Math.abs(this.x + this.w - obj.x);
    const objectRight = Math.abs(this.x - (obj.x + obj.w));
    const objectTop = Math.abs(this.y + this.h - obj.y);

    if (
      this.y <= obj.y + obj.h &&
      this.y + this.h > obj.y + obj.h &&
      objectBottom < objectLeft &&
      objectBottom < objectRight
    ) {
      this.y = obj.y + obj.h;
    }
    if (
      this.y + this.h >= obj.y &&
      this.y < obj.y &&
      objectTop < objectLeft &&
      objectTop < objectRight
    ) {
      this.y = obj.y - this.h;
      this.isJump = false;
      this.velocityY = 0;
    }
    if (
      this.x + this.w >= obj.x &&
      this.x < obj.x &&
      objectLeft < objectBottom &&
      objectLeft < objectTop
    ) {
      this.x = obj.x - this.w;
      this.velocityX = 0;
    }
    if (
      this.x <= obj.x + obj.w &&
      this.x + this.w > obj.x + obj.w &&
      objectRight < objectBottom &&
      objectRight < objectTop
    ) {
      this.x = obj.x + obj.w;
      this.velocityX = 0;
    }
  }

  move(isForward) {
    super.move(isForward);
  }

  isJumping() {
    return this.isJump;
  }

  jump() {
    this.isJump = true;
    this.velocityY = -this.speed * 2.2;
  }

  ground() {
    const gameManager = new GameManager();

    if (this.y > gameManager.height - 56) {
      this.isJump = false;
      this.y = gameManager.height - 56;
      this.velocityY = 0;
    }
  }

  reset(){
    this.w = playerOptions.size;
    this.h = playerOptions.size;
    this.speed = playerOptions.speed;
  }
}
