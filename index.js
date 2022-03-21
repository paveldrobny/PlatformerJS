import PanelMain from "./ui/panels/main.js";
import MessageNavigate from "./ui/messages/navigate.js";
import MessageVersion from "./ui/messages/version.js";
import GameManager from "./gameManager.js";
import Player from "./objects/player.js";
import Editor from "./editor.js";
import KEYS from "./keys.js";
import { drawLevels } from "./levels.js";
import { editorOptions, menuOptions } from "./global.js";

//#region INIT
const panelMain = new PanelMain();
const messageNavigate = new MessageNavigate();
const messageVersion = new MessageVersion();
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gameManager = new GameManager();
const player = new Player(30, 600, "green");
const editor = new Editor();
let canvasWidth = gameManager.width;
let canvasHeight = gameManager.height;
//#endregion

//#region EVENTS
window.addEventListener("load", function () {
  switchPanel("main");
  panelMain.create();
  messageNavigate.create();
  messageVersion.create();
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

function drawCanvasMessage() {
  context.font = "15px sans-serif";
  context.fillStyle = "gray";
  context.textAlign = "center";
  context.fillText("Press ESC to return to the main menu", 141, 20);
  context.fillText("Press A,D,W to move", 85, 45);
}

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
//#endregion

//#region EDITOR
let editorCollecteds = [];
let editorPlatforms = [];

const editorObjectCurrent = document.getElementById("editor-current");
const editorObjectPosX = document.getElementById("editor-posX");
const editorObjectPosY = document.getElementById("editor-posY");
const editorObjectWidth = document.getElementById("editor-width");
const editorObjectHeight = document.getElementById("editor-height");

const uiEditorAddObject = document.getElementById("editor-addObject");
const btnOpenAddObject = document.getElementById("open-addObject");
const btnCloseAddObject = document.getElementById("close-addObject");
const btnAddObjectVertical = document.getElementById("editor-add-vertical");
const btnAddObjectHorizontal = document.getElementById("editor-add-horizontal");
const btnAddAbilitySmall = document.getElementById("editor-add-ability-small");
const btnAddAbilityNormal = document.getElementById(
  "editor-add-ability-normal"
);

btnOpenAddObject.addEventListener("click", function () {
  uiEditorAddObject.style.display = "block";
});

btnCloseAddObject.addEventListener("click", function () {
  uiEditorAddObject.style.display = "none";
});

const sceneObjectPlatform = document.getElementById("scene-objects-platform");
const sceneObjectAbility = document.getElementById("scene-objects-ability");

btnAddObjectVertical.addEventListener("click", function () {
  editor.addPlatform(true, editorPlatforms);
  sceneObjectPlatform.innerHTML = `Platforms: ${editorPlatforms.length}`;
});

btnAddObjectHorizontal.addEventListener("click", function () {
  editor.addPlatform(false, editorPlatforms);
  sceneObjectPlatform.innerHTML = `Platforms: ${editorPlatforms.length}`;
});

btnAddAbilitySmall.addEventListener("click", function () {
  editor.addAbilitySmall(editorCollecteds);
  sceneObjectAbility.innerHTML = `Collecteds: ${editorCollecteds.length}`;
});

btnAddAbilityNormal.addEventListener("click", function () {
  editor.addAbilityNormal(editorCollecteds);
  sceneObjectAbility.innerHTML = `Collecteds: ${editorCollecteds.length}`;
});

function editorObjectGetData(object) {
  editorObjectCurrent.innerHTML = object.name;
  editorObjectPosX.innerHTML = `X: ${object.x.toFixed(1)}`;
  editorObjectPosY.innerHTML = `Y: ${object.y.toFixed(1)}`;
  editorObjectWidth.innerHTML = `Width: ${object.w.toFixed(1)}`;
  editorObjectHeight.innerHTML = `Height: ${object.h.toFixed(1)}`;
}

function editorObjectDefault() {
  editorObjectCurrent.innerHTML = "{no selected}";
  editorObjectPosX.innerHTML = "X: {no selected}";
  editorObjectPosY.innerHTML = "Y: {no selected}";
  editorObjectWidth.innerHTML = "Width: {no selected}";
  editorObjectHeight.innerHTML = "Height: {no selected}";
}

window.addEventListener("mousedown", function (event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  for (let i = 0; i < editorPlatforms.length; i++) {
    if (editorPlatforms[i].collisionMouse(x, y)) {
      editorPlatforms[i].isDraggable = true;
      editorObjectGetData(editorPlatforms[i]);
      return;
    }
  }

  for (let i = 0; i < editorCollecteds.length; i++) {
    if (editorCollecteds[i].collisionMouse(x, y)) {
      editorCollecteds[i].isDraggable = true;
      editorObjectGetData(editorCollecteds[i]);
      return;
    }
  }
});

window.addEventListener("mouseup", function () {
  for (let i = 0; i < editorPlatforms.length; i++) {
    editorPlatforms[i].isDraggable = false;
    editorObjectDefault();
  }

  for (let i = 0; i < editorCollecteds.length; i++) {
    editorCollecteds[i].isDraggable = false;
    editorObjectDefault();
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
      editorObjectGetData(editorPlatforms[i]);
      platform.selected(context);
    }
  }

  for (let i = 0; i < editorCollecteds.length; i++) {
    if (editorCollecteds[i].isDraggable) {
      const collected = editorCollecteds[i];
      collected.setPosition(x - collected.w / 2, y - collected.h / 2);
      editorObjectGetData(editorCollecteds[i]);
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

//#region  INPUT
let keyState = [];

function onKeyDown(event) {
  panelMain.navigate();
  keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  keyState[event.keyCode] = false;
}

function input() {
  if (keyState[KEYS.W]) {
    player.y -= 1;
    if (!player.isJumping()) {
      player.jump();
    }
  }
  if (keyState[KEYS.A]) {
    player.y += 1;
    if (player.velocityX > -player.speed) {
      player.move(false);
    }
  }
  if (keyState[KEYS.D]) {
    if (player.velocityX < player.speed) {
      player.move(true);
    }
  }
  if (keyState[KEYS.Esc]) {
    if (!menuOptions.mainMenu) {
      const editorUI = document.getElementsByClassName("editor");
      const menuUI = document.getElementById("ui");
      menuOptions.mainMenu = true;

      if (editorOptions.enabled) {
        editorUI[0].classList.add("hide");
        player.x = 30;
        player.y = 600;
        editorCollecteds = [];
        editorPlatforms = [];
      }

      editorOptions.enabled = false;
      menuUI.style.display = "block";
      gameManager.resize(canvas, context, canvasWidth, canvasHeight);
    }
  }
}
//#endregion

//#region UPDATE
const update = () => {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  if (!menuOptions.mainMenu) {
    player.velocityX *= player.friction;
    player.velocityY += player.gravity;
  }

  input();
  gameManager.area(player);

  if (editorCollecteds.length > 0) {
    editorCollecteds.forEach((collected) => collected.selected(context));
    editorCollecteds.forEach((collected) => collected.draw(context));
    editorCollecteds.forEach((collected) => collected.collision(player));
  }

  if (editorPlatforms.length > 0) {
    editorPlatforms.forEach((platform) => platform.selected(context));
    editorPlatforms.forEach((platform) => platform.draw(context));
    editorPlatforms.forEach((platform) => player.collision(platform));
  }

  if (!editorOptions.enabled && !menuOptions.mainMenu) {
    drawLevels(context, player);
    drawCanvasMessage();
  }

  if (!menuOptions.mainMenu) {
    player.draw(context);

    player.x += player.velocityX;
    player.y += player.velocityY;
  }

  requestAnimationFrame(update);
};

update();
//#endregion
