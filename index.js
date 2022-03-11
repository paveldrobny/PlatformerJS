import PanelMain from "./ui/panels/main.js";
import MessageNavigate from "./ui/messages/navigate.js";
import MessageVersion from "./ui/messages/version.js";
import GameManager from "./gameManager.js";
import Player from "./objects/player.js";
import Platform from "./objects/platform.js";

const panelMain = new PanelMain();
const messageNavigate = new MessageNavigate();
const messageVersion = new MessageVersion();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gameManager = new GameManager();
const player = new Player(100, 600, "green");
const input = new Input();

const platforms = [
  new Platform(200, 600, 200, 155, "red"),
  new Platform(900, 500, 30, 30, "orange")
];

let canvasWidth = gameManager.width;
let canvasHeight = gameManager.height;

window.addEventListener("load", function () {
  // switchPanel("main");
  // panelMain.create();
  // messageNavigate.create();
  // messageVersion.create();
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

//#endregion

function switchPanel(openPanel) {
  const panels = document.getElementsByClassName("panel");

  for (let i = 0; i < panels.length; i++) {
    panels[i].style.display = "none";

    if (panels[i].id == openPanel) {
      panels[i].style.display = "block";
    }
  }
}

let keyState = [];

function onKeyDown(event) {
  keyState[event.key] = true;
}

function onKeyUp(event) {
  keyState[event.key] = false;
}

function Input() {
  this.keys = {
    W: "w",
    A: "a",
    S: "s",
    D: "d",
    ArrowUp: "ArrowUp",
    ArrowLeft: "ArrowLeft",
    ArrowDown: "ArrowDown",
    ArrowRight: "ArrowRight",
    Spacebar: " "
  };
}

Input.prototype.keyDetect = function () {
  if (keyState[this.keys.W]) {
    player.y -= 1;
    if (!player.isJumping()) {
      player.jump();
    }
  }

  if (keyState[this.keys.S]) {
    player.y += 1;
    // if (!player.isJumping()) {
    //   player.jump();
    // }
  }
  if (keyState[this.keys.A]) {
    if (player.velocityX > -player.speed) {
      player.move(false);
    }
  }
  if (keyState[this.keys.D]) {
    if (player.velocityX < player.speed) {
      player.move(true);
    }
  }
};

const update = () => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  player.velocityX *= player.friction;
  player.velocityY += player.gravity;

  input.keyDetect();
  gameManager.area(player);

  platforms.forEach(platform => platform.draw(context));
  platforms.forEach(platform => player.collision(platform))
  player.draw(context);

  if (player.y > gameManager.height - 56) {
    player.isJump = false;
    player.y = gameManager.height - 56;
    player.velocityY = 0;
  }

  player.x += player.velocityX;
  player.y += player.velocityY;

  requestAnimationFrame(update);
};

update();