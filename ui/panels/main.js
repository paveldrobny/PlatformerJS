import PanelBase from "./base.js";
import keys from "../../keys.js";
import { editorOptions, levelOptions, menuOptions } from "../../global.js";
import GameManager from "../../gameManager.js";

export default class PanelMain extends PanelBase {
  constructor() {
    super();
    this.menuIndex = 0;
    this.itemsPositionY = -45;
    this.itemsID = ["newGame", "continue", "editor"];
    this.itemsText = ["NEW GAME", "CONTINUE", "EDITOR"];
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

  startGame(editorUI) {
    ui.style.display = "none";
    editorOptions.enabled = false;
    editorUI.classList.add("hide");
    menuOptions.mainMenu = false;
  }

  chooseEditor(ui, editorUI) {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const gameManager = new GameManager();
    ui.style.display = "none";
    editorOptions.enabled = true;
    editorUI.classList.remove("hide");
    gameManager.resize(canvas, context, gameManager.width, gameManager.height);
  }

  choose() {
    const ui = document.getElementById("ui");
    const editorUI = document.getElementsByClassName("editor");
    switch (this.menuIndex) {
      case 0:
        this.startGame(editorUI[0]);
        levelOptions.currentLevel = 0;
        levelOptions.resetLevel();
        break;
      case 1:
        this.startGame(editorUI[0]);
        levelOptions.loadLevel();
        break;
      case 2:
        menuOptions.mainMenu = false;
        this.chooseEditor(ui, editorUI[0]);
        break;
    }
  }
}
