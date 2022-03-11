import ObjectBase from "./base.js";

export default class Platform extends ObjectBase {
  constructor(x, y, w, h, color) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw(context) {
    super.draw(context);
  }
}
