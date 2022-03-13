import KEYS from "./keys.js";
import Collected from "./objects/collected.js";
import Platform from "./objects/platform.js";

export default class Editor {
  constructor() {}

  addPlatform(isVertical, array) {
    if (isVertical) {
      array.push(new Platform(15, 15, 20, 150, "orange"));
      return;
    }
    array.push(new Platform(50, 15, 150, 20, "red"));
  }

  addAbilitySmall(array) {
    array.push(new Collected(215, 15, 30, 30, "pink", "smallSize"));
  }

  addAbilityNormal(array){
    array.push(new Collected(260, 15, 30, 30, "purple", "normalSize"));
  }

  addCrystal(array){
    array.push(new Collected(300, 15, 30, 30, "aqua", "crystal"));
  }
}
