import PanelMain from "./ui/panels/main.js";
import GameManager from "./gameManager.js";
import Player from "./objects/player.js";
import Editor from "./editor.js";
import KEYS from "./keys.js";
import { drawLevels } from "./levels.js";
import {
  editorOptions,
  gameOptions,
  levelOptions,
  menuOptions
} from "./global.js";

//#region INIT
const panelMain = new PanelMain();
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
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

function drawCanvasMessage() {
  context.font = "15px sans-serif";
  context.fillStyle = "gray";
  context.textAlign = "left";
  context.fillText("Press ESC to return to the main menu", 10, 20);
  context.fillText("Press A,D,W to move", 10, 45);
}

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
//#endregion

//#region EDITOR
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
const btnOpenExportLevel = document.getElementById("open-export-level");
const btnCloseExportLevel = document.getElementById("close-exportLevel");
const btnPlaying = document.getElementById("playing");

btnOpenAddObject.addEventListener("click", function () {
  uiEditorAddObject.style.display = "block";
});

btnCloseAddObject.addEventListener("click", function () {
  uiEditorAddObject.style.display = "none";
});

const sceneObjectPlatform = document.getElementById("scene-objects-platform");
const sceneObjectAbility = document.getElementById("scene-objects-ability");

btnAddObjectVertical.addEventListener("click", function () {
  editor.addPlatform(true, editorOptions.level.platforms);
  sceneObjectPlatform.innerHTML = `Platforms: ${editorOptions.level.platforms.length}`;
});

btnAddObjectHorizontal.addEventListener("click", function () {
  editor.addPlatform(false, editorOptions.level.platforms);
  sceneObjectPlatform.innerHTML = `Platforms: ${editorOptions.level.platforms.length}`;
});

btnAddAbilitySmall.addEventListener("click", function () {
  editor.addAbilitySmall(editorOptions.level.collecteds);
  sceneObjectAbility.innerHTML = `Collecteds: ${editorOptions.level.collecteds.length}`;
});

btnAddAbilityNormal.addEventListener("click", function () {
  editor.addAbilityNormal(editorOptions.level.collecteds);
  sceneObjectAbility.innerHTML = `Collecteds: ${editorOptions.level.collecteds.length}`;
});

btnOpenExportLevel.addEventListener("click", function () {
  const editorExport = document.getElementById("editor-export");
  editorExport.style.display = "block";
  exportLevel();
});

btnCloseExportLevel.addEventListener("click", function () {
  const editorExport = document.getElementById("editor-export");
  editorExport.style.display = "none";
});

btnPlaying.addEventListener("click", function () {
  if (!editorOptions.playing) {
    btnPlaying.innerHTML = "Stop";
    btnPlaying.classList.add("active");
    editorOptions.playing = true;
  } else {
    btnPlaying.innerHTML = "Play";
    btnPlaying.classList.remove("active");
    editorOptions.playing = false;
  }
});

function exportLevel() {
  const exportLevelText = document.getElementById("editor-export-text");
  const editorPlatforms = editorOptions.level.platforms;
  const editorCollecteds = editorOptions.level.collecteds;
  const levelData = [];
  const exportLevelTextStart = "const level_number = { <br>";
  const exportLevelTextPlayer = `player: {
    x: ${player.x.toFixed(1)},
    y: ${player.y.toFixed(1) - 30}
    },`;

  let exportLevelTextPlatforms = "<br> platforms: [";
  let exportLevelTextCollecteds = "<br> ], <br> collecteds: [";
  const exportLevelTextEnd = "<br> ]}";
  exportLevelText.innerHTML = "";

  for (let i = 0; i < editorPlatforms.length; i++) {
    const x = editorPlatforms[i].x.toFixed(1);
    const y = editorPlatforms[i].y.toFixed(1);
    const w = editorPlatforms[i].w.toFixed(1);
    const h = editorPlatforms[i].h.toFixed(1);
    const color = editorPlatforms[i].color;

    exportLevelTextPlatforms += `<br> new Platform(${x}, ${y}, ${w}, ${h}, "${color}"),`;
  }

  for (let i = 0; i < editorCollecteds.length; i++) {
    const x = editorCollecteds[i].x.toFixed(1);
    const y = editorCollecteds[i].y.toFixed(1);
    const w = editorCollecteds[i].w.toFixed(1);
    const h = editorCollecteds[i].h.toFixed(1);
    const color = editorCollecteds[i].color;
    const state = editorCollecteds[i].state;

    exportLevelTextCollecteds += `<br> new Collected(${x}, ${y}, ${w}, ${h}, "${color}", "${state}"),`;
  }

  levelData.push(
    exportLevelTextStart,
    exportLevelTextPlayer,
    exportLevelTextPlatforms,
    exportLevelTextCollecteds,
    exportLevelTextEnd
  );

  for (let i = 0; i < levelData.length; i++) {
    exportLevelText.innerHTML += levelData[i];
  }
}

function editorObjectGetData(object, isCollected) {
  editorObjectCurrent.innerHTML = object.name;

  if (isCollected) {
    editorObjectCurrent.innerHTML = `${object.name} - ${object.state}`;
  }

  editorObjectPosX.innerHTML = `X: ${object.x.toFixed(1)}`;
  editorObjectPosY.innerHTML = `Y: ${object.y.toFixed(1)}`;
  editorObjectWidth.innerHTML = `Width: ${object.w.toFixed(1)} px`;
  editorObjectHeight.innerHTML = `Height: ${object.h.toFixed(1)} px`;
}

function editorObjectDefault() {
  editorObjectCurrent.innerHTML = "{no selected}";
  editorObjectPosX.innerHTML = "X: {no selected}";
  editorObjectPosY.innerHTML = "Y: {no selected}";
  editorObjectWidth.innerHTML = "Width: {no selected}";
  editorObjectHeight.innerHTML = "Height: {no selected}";
}

function selectObject() {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  if (!editorOptions.playing) {
    if (player.collisionMouse(x, y)) {
      player.isDraggable = true;
      editorObjectGetData(player);
      return;
    }

    for (let i = 0; i < editorOptions.level.platforms.length; i++) {
      if (editorOptions.level.platforms[i].collisionMouse(x, y)) {
        editorOptions.level.platforms[i].isDraggable = true;
        editorObjectGetData(editorOptions.level.platforms[i]);
        return;
      }
    }

    for (let i = 0; i < editorOptions.level.collecteds.length; i++) {
      if (editorOptions.level.collecteds[i].collisionMouse(x, y)) {
        editorOptions.level.collecteds[i].isDraggable = true;
        editorObjectGetData(editorOptions.level.collecteds[i], true);
        return;
      }
    }
  }
}

function unSelectObject() {
  player.isDraggable = false;

  for (let i = 0; i < editorOptions.level.platforms.length; i++) {
    editorOptions.level.platforms[i].isDraggable = false;
  }

  for (let i = 0; i < editorOptions.level.collecteds.length; i++) {
    editorOptions.level.collecteds[i].isDraggable = false;
  }

  editorObjectDefault();
}

function moveObject() {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  if (!editorOptions.playing) {
    if (player.isDraggable) {
      player.setPosition(x - player.w / 2, y - player.h / 2);
      editorObjectGetData(player);
    }

    for (let i = 0; i < editorOptions.level.platforms.length; i++) {
      if (editorOptions.level.platforms[i].isDraggable) {
        const platform = editorOptions.level.platforms[i];
        platform.setPosition(x - platform.w / 2, y - platform.h / 2);
        editorObjectGetData(editorOptions.level.platforms[i]);
      }
    }

    for (let i = 0; i < editorOptions.level.collecteds.length; i++) {
      if (editorOptions.level.collecteds[i].isDraggable) {
        const collected = editorOptions.level.collecteds[i];
        collected.setPosition(x - collected.w / 2, y - collected.h / 2);
        editorObjectGetData(editorOptions.level.collecteds[i], true);
      }
    }
  }
}

window.addEventListener("mousedown", function () {
  selectObject();
});

window.addEventListener("mouseup", function () {
  unSelectObject();
});

window.addEventListener("mousemove", function () {
  moveObject();
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
  event.preventDefault();
  keyState[event.keyCode] = true;
}

function onKeyUp(event) {
  event.preventDefault();
  keyState[event.keyCode] = false;
}

function input() {
  if (keyState[KEYS.W]) {
    if (gameOptions.startGame || editorOptions.playing) {
      player.y -= 1;
      if (!player.isJumping()) {
        player.jump();
      }
    }
  }
  if (keyState[KEYS.A]) {
    if (gameOptions.startGame || editorOptions.playing) {
      if (player.velocityX > -player.speed) {
        player.moveDirection(false);
      }
    }
  }
  if (keyState[KEYS.D]) {
    if (gameOptions.startGame || editorOptions.playing) {
      if (player.velocityX < player.speed) {
        player.moveDirection(true);
      }
    }
  }
  if (keyState[KEYS.Esc]) {
    if (!menuOptions.mainMenu) {
      const editorUI = document.getElementsByClassName("editor");
      const menuUI = document.getElementById("ui");
      menuOptions.mainMenu = true;
      gameOptions.startGame = false;

      if (editorOptions.enabled) {
        btnPlaying.innerHTML = "Play";
        btnPlaying.classList.remove("active");
        editorOptions.playing = false;
        editorUI[0].classList.add("hide");
        player.setPosition(30, 600)
        editorOptions.level.collecteds = [];
        editorOptions.level.platforms = [];
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

  if (gameOptions.startGame || editorOptions.playing) {
    player.velocityX *= player.friction;
    player.velocityY += player.gravity;
  }

  input();
  gameManager.area(player);

  if (editorOptions.level.collecteds.length > 0) {
    editorOptions.level.collecteds.forEach((collected) =>
      collected.selected(context)
    );
    editorOptions.level.collecteds.forEach((collected) =>
      collected.draw(context)
    );
    editorOptions.level.collecteds.forEach((collected) =>
      collected.collision(player)
    );
  }

  if (editorOptions.level.platforms.length > 0) {
    editorOptions.level.platforms.forEach((platform) =>
      platform.selected(context)
    );
    editorOptions.level.platforms.forEach((platform) => platform.draw(context));
    editorOptions.level.platforms.forEach((platform) =>
      player.collision(platform)
    );
  }

  if (!editorOptions.enabled && !menuOptions.mainMenu) {
    drawLevels(context, player);
    drawCanvasMessage();
  }

  if (editorOptions.enabled && !editorOptions.playing) {
    player.selected(context);
  }

  if (!menuOptions.mainMenu) {
    player.draw(context);
  }

  if (gameOptions.startGame || editorOptions.playing) {
    player.x += player.velocityX;
    player.y += player.velocityY;
  }

  requestAnimationFrame(update);
};

update();
//#endregion
