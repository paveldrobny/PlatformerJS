import Platform from "./objects/platform.js";
import Collected from "./objects/collected.js";
import { levelOptions } from "./global.js";

const level_1 = {
  platforms: [
    new Platform(153, 521, 150, 20, "red"),
    new Platform(523, 329, 50, 150, "orange"),
    new Platform(780, 306, 110, 150, "orange"),
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

levelOptions.levels.push(level_1, level_2);

function drawLevels(context, player) {
  for (let i = 0; i < levelOptions.levels.length; i++) {
    if (i == levelOptions.currentLevel) {
      levelOptions.levels[i].collecteds.forEach((collected) =>
        collected.draw(context)
      );
      levelOptions.levels[i].collecteds.forEach((collected) =>
        collected.collision(player)
      );
      levelOptions.levels[i].platforms.forEach((platform) =>
        platform.draw(context)
      );
      levelOptions.levels[i].platforms.forEach((platform) =>
        player.collision(platform)
      );
    }
  }
}

export { drawLevels };
