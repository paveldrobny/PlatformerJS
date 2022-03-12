import PanelMain from "./ui/panels/main.js";
import MessageNavigate from "./ui/messages/navigate.js";
import MessageVersion from "./ui/messages/version.js";
import GameManager from "./gameManager.js";
import Player from "./objects/player.js";
import Platform from "./objects/platform.js";
import MessageBase from "./ui/messages/base.js";
import Collected from "./objects/collected.js";

const panelMain = new PanelMain();
const messageNavigate = new MessageNavigate();
const messageVersion = new MessageVersion();
const messageDebug = new MessageBase();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gameManager = new GameManager();
const player = new Player(50, 600, "green");
const input = new Input();

let platforms = [
  new Platform(200, 600, 260, 155, "red"),
  new Platform(650, 500, 250, 20, "orange"),
  new Platform(1150, 400, 30, 30, "aqua")
];
let canvasWidth = gameManager.width;
let canvasHeight = gameManager.height;
let isEditorMode = false;

window.addEventListener("load", function () {
  // switchPanel("main");
  // panelMain.create();
  // messageNavigate.create();
  // messageVersion.create();
  // messageDebug.create(`Width:${player.w}, Jump speed:${player.speed}`, 15, 30);

  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

let editorCollecteds = [];
let editorPlatforms = [];

window.addEventListener("mousedown", function (event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  for (let i = 0; i < editorPlatforms.length; i++) {
    if (editorPlatforms[i].collisionTest(x, y)) {
      editorPlatforms[i].isDraggable = true;
      return;
    }
  }
});

window.addEventListener("mouseup", function (event) {
  for (let i = 0; i < editorPlatforms.length; i++) {
    editorPlatforms[i].isDraggable = false;
  }
});

window.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  for (let i = 0; i < editorPlatforms.length; i++) {
    if (editorPlatforms[i].isDraggable) {
      const platform = editorPlatforms[i];
      platform.setPosition(x - platform.w / 2, y - platform.h / 2);
    }
  }
});

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
    Spacebar: " ",
    1: "1",
    Tab: "Tab"
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

  if (keyState[this.keys.Tab]) {
    isEditorMode = true;
  }
  if (keyState[this.keys[1]]) {
    editorPlatforms.push(new Platform(15, 15, 150, 20, "red"));
  }
};

const update = () => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  if (!isEditorMode) {
    player.velocityX *= player.friction;
    player.velocityY += player.gravity;
  }

  input.keyDetect();
  gameManager.area(player);

  // platforms.forEach((platform) => platform.draw(context));
  // platforms.forEach((platform) => player.collision(platform));

  if (editorPlatforms.length > 0) {
    editorPlatforms.forEach((platform) => platform.draw(context));
    editorPlatforms.forEach((platform) => player.collision(platform));
  }

  player.draw(context);

  if (!isEditorMode) {
    player.x += player.velocityX;
    player.y += player.velocityY;
  }

  requestAnimationFrame(update);
};

update();
