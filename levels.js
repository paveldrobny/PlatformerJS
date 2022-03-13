import Platform from "./objects/platform.js";
import Collected from "./objects/collected.js";
import { levelOptions } from "./global.js";

const level_1 = {
  platforms: [
    new Platform(153, 521, 150, 20, "red"),
    new Platform(523, 329, 20, 150, "orange"),
    new Platform(780, 306, 20, 150, "orange"),
    new Platform(1041, 250, 150, 20, "red")
  ],
  collecteds: [
    new Collected(258, 481, 20, 20, "pink", "smallSize"),
    new Collected(1150, 210, 20, 20, "aqua", "crystal")
  ]
};

const level_2 = {
  platforms: [
    new Platform(593, 521, 150, 20, "red"),
    new Platform(300, 321, 150, 20, "red"),
    new Platform(850, 170, 150, 20, "red")
  ],
  collecteds: [new Collected(970, 130, 20, 20, "aqua", "crystal")]
};

function levelShow(array, context, player) {
  array.collecteds.forEach((collected) => collected.draw(context));
  array.collecteds.forEach((collected) => collected.collision(player));
  array.platforms.forEach((platform) => platform.draw(context));
  array.platforms.forEach((platform) => player.collision(platform));
}

function drawLevels(context, player) {
  if (levelOptions.currentLvl == 0) {
    levelShow(level_1, context, player);
  }
  if (levelOptions.currentLvl == 1) {
    levelShow(level_2, context, player);
  }
}

export { drawLevels };
