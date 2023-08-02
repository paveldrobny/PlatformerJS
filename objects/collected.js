import {
  editorOptions,
  gameOptions,
  levelOptions,
  playerOptions,
} from "../global.js";
import ObjectBase from "./base.js";

export default class Collected extends ObjectBase {
  constructor(x, y, w, h, color, state) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.name = "Collected";
    this.type = "Collected";
    this.state = state;
  }

  draw(context) {
    super.draw(context);
  }

  collision(obj) {
    if (gameOptions.startGame === true || editorOptions.playing === true)
      if (super.collision(obj)) {
        if (this.state == "smallSize") {
          this.smallSize(obj);
        }
        if (this.state == "normalSize") {
          this.normalSize(obj);
        }
        if (this.state == "crystal") {
          this.crystal(obj);
        }
      }
  }

  smallSize(object) {
    object.w = 30;
    object.h = 30;
  }

  normalSize(object) {
    object.w = playerOptions.size;
    object.h = playerOptions.size;
  }

  crystal(obj) {
    if (levelOptions.currentLevel < levelOptions.levels.length - 1) {
      levelOptions.currentLevel++;
      levelOptions.saveLevel();

      let playerPosition =
        levelOptions.levels[levelOptions.currentLevel].player;

      obj.x = playerPosition.x;
      obj.y = playerPosition.y;
      obj.w = 56;
      obj.h = 56;
    }
  }
}
