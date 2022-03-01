import PanelBase from "./base.js";
import keys from "../../keys.js";

export default class PanelMain extends PanelBase {
  constructor() {
    super();
    this.menuIndex = 0;
    this.itemsPositionY = -20;
    this.itemsID = ["newGame", "continue", "exitGame"];
    this.itemsText = ["NEW GAME", "CONTINUE", "EXIT GAME"];
  }

  create() {
    super.create(
      "main",
      "TITLE GAME",
      this.itemsID.length,
      this.itemsID,
      this.itemsPositionY,
      this.itemsText
    );
  }

  navigate() {
    if (event.keyCode == keys.W || event.keyCode == keys.ArrowUp) {
      if (this.menuIndex <= 0) return;
      this.menuIndex--;
    }

    if (event.keyCode == keys.S || event.keyCode == keys.ArrowDown) {
      if (this.menuIndex >= this.itemsID.length - 1) return;
      this.menuIndex++;
    }

    if (event.keyCode == keys.Enter || event.keyCode == keys.Spacebar) {
      this.choose();
    }

    super.navigate("main", this.menuIndex);
  }

  choose() {
    switch (this.menuIndex) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        window.close();
        break;
      case 3:
        window.close();
        break;
    }
  }
}
