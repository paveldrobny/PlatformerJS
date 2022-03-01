import MessageBase from "./base.js";

export default class MessageNavigate extends MessageBase {
  constructor() {
    super()
    this.positionX = 5;
    this.positionY = 700;
  }

  create() {
    super.create("Navigate on arrow keys", this.positionX, this.positionY);
  }
}
