import MessageBase from "./base.js";

export default class MessageNavigate extends MessageBase {
  constructor() {
    super();
    this.positionX = 10;
    this.positionY = 700;
  }

  create() {
    super.create("WASD - Navigation", this.positionX, this.positionY - 27);
    super.create("Enter, Spacebar - Confirm", this.positionX, this.positionY);
  }
}
