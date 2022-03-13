import PanelBase from "./base.js";
import keys from "../../keys.js";
import { editorOptions, menuOptions } from "../../global.js";
import GameManager from "../../gameManager.js";

export default class PanelMain extends PanelBase {
  constructor() {
    super();
    this.menuIndex = 0;
    this.itemsPositionY = -20;
    this.itemsID = ["play", "editor", "exitGame"];
    this.itemsText = ["PLAY", "EDITOR", "EXIT GAME"];
  }

  create() {
    super.create(
      "main",
      "PLATFORMER on JS",
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

  chooseEditor(ui, editorUI) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const gameManager = new GameManager();
    ui.style.display = "none";
    editorOptions.enableEditorMode = true;
    editorUI.classList.remove("hide");
    gameManager.resize(canvas, context, gameManager.width, gameManager.height);
  }

  choose() {
    const ui = document.getElementById("ui");
    const editorUI = document.getElementsByClassName("editor");
    switch (this.menuIndex) {
      case 0:
        ui.style.display = "none";
        editorOptions.enableEditorMode = false;
        editorUI[0].classList.add("hide");
        menuOptions.setMainMenu = false;
        break;
      case 1:
        menuOptions.setMainMenu = false;
        this.chooseEditor(ui, editorUI[0]);
        break;
      case 2:
        window.close();
        break;
    }
  }
}
