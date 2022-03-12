import ObjectBase from "./base.js";

export default class Collected extends ObjectBase {
  constructor(x, y, w, h, color) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.states = ["smallSize", "normalSize", "coin", "crystal"];
    this.currentState = "";
  }

  draw(context) {
    super.draw(context);
  }

  smallSize() {}

  normalSize() {}

  сoin() {}

  crystal() {}
}
