import MessageBase from "./base.js";

export default class MessageVersion extends MessageBase {
  constructor() {
    super();
    this.positionX = 1160;
    this.positionY = 700;
  }

  create() {
    super.create("Version: 1.1", this.positionX, this.positionY);
  }
}
