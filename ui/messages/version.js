import MessageBase from "./base.js";

export default class MessageVersion extends MessageBase {
  constructor() {
    super();
    this.positionX = 1175;
    this.positionY = 700;
  }

  create() {
    super.create("Version: 1.2", this.positionX, this.positionY);
  }
}
