import GameManager from "../gameManager.js";
import { levelOptions } from "../global.js";
import ObjectBase from "./base.js";

export default class Collected extends ObjectBase {
  constructor(x, y, w, h, color, state) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.name = "Collected";
    this.state = state;
  }

  draw(context) {
    super.draw(context);
  }

  collision(obj) {
    if (
      this.x + this.w > obj.x &&
      this.x < obj.x + obj.w &&
      this.y + this.h > obj.y &&
      this.y < obj.y + obj.h
    ) {
      if (this.state == "smallSize") {
        this.smallSize(obj);
      }
      if (this.state == "normalSize") {
        this.normalSize(obj);
      }
      if (this.state == "crystal") {
        this.crystal(obj);
      }
    }
  }

  smallSize(object) {
    object.w = 30;
    object.h = 30;
  }

  normalSize(object) {
    object.w = 56;
    object.h = 56;
  }

  crystal(obj) {
    levelOptions.changeLvl = 1;
    obj.x = 0;
    obj.y = 600;
    obj.w = 56;
    obj.h = 56;
  }
}
