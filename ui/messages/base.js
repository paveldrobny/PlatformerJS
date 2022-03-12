export default class MessageBase {
  constructor() {
    this.svgNS = "http://www.w3.org/2000/svg";
  }

  create(text, positionX, positionY) {
    const ui = document.getElementById("ui");
    const message = document.createElementNS(this.svgNS, "text");

    message.setAttributeNS(null, "class", "message");
    message.setAttributeNS(null, "x", positionX);
    message.setAttributeNS(null, "y", positionY);
    message.innerHTML = `${text}`;

    ui.appendChild(message);
  }
}
