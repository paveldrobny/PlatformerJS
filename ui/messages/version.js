import MessageBase from "./base.js";

export default class MessageVersion extends MessageBase {
  constructor() {
    super();
    this.positionX = 1230;
    this.positionY = 700;
  }

  create() {
    super.create("v1.50", this.positionX, this.positionY);
  }
}
