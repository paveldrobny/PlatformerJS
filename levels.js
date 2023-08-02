import Platform from "./objects/platform.js";
import Collected from "./objects/collected.js";
import { levelOptions } from "./global.js";

const level_1 = {
  player: { x: 1071.0, y: 690.0 },
  platforms: [
    new Platform(299.0, 503.4, 20.0, 50.0, "pink"),
    new Platform(300.0, 552.9, 150.0, 20.0, "red"),
    new Platform(450.0, 552.9, 150.0, 20.0, "red"),
    new Platform(600.0, 552.9, 150.0, 20.0, "red"),
    new Platform(750.0, 552.9, 150.0, 20.0, "red"),
    new Platform(299.4, 384.0, 150.0, 20.0, "red"),
    new Platform(448.0, 384.0, 150.0, 20.0, "red"),
    new Platform(633.8, 384.0, 150.0, 20.0, "red"),
    new Platform(783.0, 384.0, 150.0, 20.0, "red"),
    new Platform(299.0, 572.8, 20.0, 150.0, "pink"),
    new Platform(1030.0, 569.6, 20.0, 150.0, "pink"),
    new Platform(900.0, 552.9, 150.0, 20.0, "red"),
    new Platform(1030.0, 403.0, 20.0, 150.0, "pink"),
    new Platform(900.0, 384.0, 150.0, 20.0, "red"),
    new Platform(1211.0, 384.0, 150.0, 20.0, "red"),
    new Platform(1017.8, 384.0, 150.0, 20.0, "red"),
    new Platform(299.0, 253.7, 20.0, 150.0, "pink"),
  ],
  collecteds: [
    new Collected(842.9, 506.2, 30.0, 30.0, "violet", "smallSize"),
    new Collected(341.0, 304.0, 30.0, 30.0, "purple", "normalSize"),
    new Collected(1156.4, 663.3, 30.0, 30.0, "aqua", "crystal"),
  ],
};

const level_2 = {
  player: {
    x: 60,
    y: 60,
  },
  platforms: [
    new Platform(153, 521, 150, 20, "red"),
    new Platform(523, 329, 50, 150, "orange"),
    new Platform(780, 306, 110, 150, "orange"),
    new Platform(1041, 250, 150, 20, "red"),
  ],
  collecteds: [
    new Collected(258, 481, 20, 20, "pink", "smallSize"),
    new Collected(1150, 210, 20, 20, "aqua", "crystal"),
  ],
};

const level_3 = {
  player: {
    x: 1000,
    y: 600,
  },
  platforms: [
    new Platform(593, 521, 150, 20, "red"),
    new Platform(300, 321, 150, 20, "red"),
    new Platform(850, 170, 150, 20, "red"),
  ],
  collecteds: [new Collected(970, 130, 20, 20, "aqua", "crystal")],
};

levelOptions.levels.push(level_1, level_2, level_3);

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
