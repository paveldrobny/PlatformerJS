import PanelMain from "./ui/panels/main.js";
import GameManager from "./gameManager.js";
import Player from "./objects/player.js";
import Editor from "./editor.js";
import KEYS from "./keys.js";
import { drawLevels } from "./levels.js";
import { editorOptions, gameOptions, menuOptions } from "./global.js";

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

window.addEventListener("resize", function () {
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
//#endregion

//#region EDITOR
const editorObjectsCount = document.getElementById("scene-objects-count");
const editorObjectCurrent = document.getElementById("editor-current");
const editorObjectPosX = document.getElementById("editor-posX");
const editorObjectPosY = document.getElementById("editor-posY");
const editorObjectWidth = document.getElementById("editor-width");
const editorObjectHeight = document.getElementById("editor-height");
const editorObjectColor = document.getElementById("editor-color");
const uiEditorAddObject = document.getElementById("ui-add-object");
const uiEditorExport = document.getElementById("ui-export");
const btnOpenAddObject = document.getElementById("btn-open-add-object");
const btnCloseAddObject = document.getElementById("btn-close-add-object");
const btnAddObjectVertical = document.getElementById("btn-add-vertical");
const btnAddObjectHorizontal = document.getElementById("btn-add-horizontal");
const btnAddAbilitySmall = document.getElementById("btn-add-ability-small");
const btnAddAbilityNormal = document.getElementById("btn-add-ability-normal");
const btnAddTriggerLevel = document.getElementById("btn-add-trigger-level");
const btnOpenExportLevel = document.getElementById("btn-open-export");
const btnCloseExportLevel = document.getElementById("btn-close-export");
const btnPlaying = document.getElementById("playing");
const btnDeleteObj = document.getElementById("btn-delete-obj");

const updateSceneObjectCount = () => {
  const platforms = editorOptions.level.platforms.length;
  const collected = editorOptions.level.collecteds.length;
  editorObjectsCount.innerHTML = `Object in scene (${
    1 + platforms + collected
  })`;
};

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
  sceneObjectPlatform.innerHTML = editorOptions.level.platforms.length;
  updateSceneObjectCount();
});

btnAddObjectHorizontal.addEventListener("click", function () {
  editor.addPlatform(false, editorOptions.level.platforms);
  sceneObjectPlatform.innerHTML = editorOptions.level.platforms.length;
  updateSceneObjectCount();
});

btnAddAbilitySmall.addEventListener("click", function () {
  editor.addAbilitySmall(editorOptions.level.collecteds);
  sceneObjectAbility.innerHTML = editorOptions.level.collecteds.length;
  updateSceneObjectCount();
});

btnAddAbilityNormal.addEventListener("click", function () {
  editor.addAbilityNormal(editorOptions.level.collecteds);
  sceneObjectAbility.innerHTML = editorOptions.level.collecteds.length;
  updateSceneObjectCount();
});

btnAddTriggerLevel.addEventListener("click", function () {
  for (let i = 0; i < editorOptions.level.collecteds.length; i++) {
    if (editorOptions.level.collecteds[i].state === "crystal") {
      return;
    }
  }

  editor.addCrystal(editorOptions.level.collecteds);
  sceneObjectAbility.innerHTML = editorOptions.level.collecteds.length;
  updateSceneObjectCount();
});

btnOpenExportLevel.addEventListener("click", function () {
  uiEditorExport.style.display = "block";
  exportLevel();
});

btnCloseExportLevel.addEventListener("click", function () {
  uiEditorExport.style.display = "none";
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

function deleteObject() {
  if (editorOptions.selectedObj.name !== "Player") {
    unSelect();
    if (editorOptions.selectedObj.type === "Platform") {
      console.log(`${editorOptions.selectedObj.name} was deleted!`);
      editor.removeObj(
        editorOptions.selectedObj,
        editorOptions.level.platforms
      );
      sceneObjectPlatform.innerHTML = editorOptions.level.platforms.length;
      updateSceneObjectCount();
    }
    if (editorOptions.selectedObj.type === "Collected") {
      console.log(`${editorOptions.selectedObj.name} was deleted!`);
      editor.removeObj(
        editorOptions.selectedObj,
        editorOptions.level.collecteds
      );
      sceneObjectAbility.innerHTML = editorOptions.level.collecteds.length;
      updateSceneObjectCount();
    }
  }
}

btnDeleteObj.addEventListener("click", () => {
  deleteObject();
});

function exportLevel() {
  const exportLevelText = document.getElementById("ui-export-text");
  const editorPlatforms = editorOptions.level.platforms;
  const editorCollecteds = editorOptions.level.collecteds;
  const levelData = [];
  const exportLevelTextStart = "const level_number = { <br>";
  const exportLevelTextPlayer = `player: {
    x: ${player.x.toFixed(1)},
    y: ${player.y.toFixed(1)}
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

function editorObjectGetData(object) {
  // if player selected disable width and height input
  if (object.name == "Player") {
    editorObjectWidth.disabled = true;
    editorObjectHeight.disabled = true;
    btnDeleteObj.disabled = true;
  } else {
    editorObjectWidth.disabled = false;
    editorObjectHeight.disabled = false;
    btnDeleteObj.disabled = false;
  }

  // if collected selected show type
  if (object.state !== undefined) {
    editorObjectCurrent.innerHTML = `${object.name} - ${object.state}`;
  } else {
    editorObjectCurrent.innerHTML = object.name;
  }

  editorObjectPosX.value = `${object.x.toFixed(1)}`;
  editorObjectPosY.value = `${object.y.toFixed(1)}`;
  editorObjectWidth.value = `${object.w.toFixed(1)}`;
  editorObjectHeight.value = `${object.h.toFixed(1)}`;
  editorObjectColor.value = `${object.color}`;
}

editorObjectPosX.oninput = () => {
  if (editorOptions.selectedObj)
    editorOptions.selectedObj.x = Number(editorObjectPosX.value);
};

editorObjectPosY.oninput = () => {
  if (editorOptions.selectedObj)
    editorOptions.selectedObj.y = Number(editorObjectPosY.value);
};

editorObjectWidth.oninput = () => {
  if (editorOptions.selectedObj)
    editorOptions.selectedObj.w = Number(editorObjectWidth.value);
};

editorObjectHeight.oninput = () => {
  if (editorOptions.selectedObj)
    editorOptions.selectedObj.h = Number(editorObjectHeight.value);
};

editorObjectColor.oninput = () => {
  if (editorOptions.selectedObj)
    editorOptions.selectedObj.color = editorObjectColor.value;
};

function selectObject() {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  if (editorOptions.playing == false && gameOptions.startGame == false) {
    if (player.collisionMouse(x, y)) {
      player.isDraggable = true;
      editorOptions.selectedObj = player;
      editorObjectGetData(editorOptions.selectedObj);
      return;
    }

    for (let i = 0; i < editorOptions.level.platforms.length; i++) {
      if (editorOptions.level.platforms[i].collisionMouse(x, y)) {
        editorOptions.level.platforms[i].isDraggable = true;
        editorOptions.selectedObj = editorOptions.level.platforms[i];
        editorObjectGetData(editorOptions.selectedObj);
        return;
      }
    }

    for (let i = 0; i < editorOptions.level.collecteds.length; i++) {
      if (editorOptions.level.collecteds[i].collisionMouse(x, y)) {
        editorOptions.level.collecteds[i].isDraggable = true;
        (editorOptions.selectedObj = editorOptions.level.collecteds[i]), true;
        editorObjectGetData(editorOptions.selectedObj);
        return;
      }
    }
  }
}

function unSelect() {
  editorObjectCurrent.innerHTML = "{no selected}";
  editorObjectPosX.value = 0;
  editorObjectPosY.value = 0;
  editorObjectWidth.value = 1;
  editorObjectHeight.value = 1;
  editorObjectColor.value = "red";
}

function unSelectObject() {
  player.isDraggable = false;

  for (let i = 0; i < editorOptions.level.platforms.length; i++) {
    editorOptions.level.platforms[i].isDraggable = false;
  }

  for (let i = 0; i < editorOptions.level.collecteds.length; i++) {
    editorOptions.level.collecteds[i].isDraggable = false;
  }

  if (editorOptions.selectedObj === null) {
    unSelect();
  }
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
        editorObjectGetData(editorOptions.level.collecteds[i]);
      }
    }
  }
}

//EDITOR: select object
window.addEventListener("mousedown", function () {
  selectObject();
});

//EDITOR: release object
window.addEventListener("mouseup", function () {
  unSelectObject();
});

//EDITOR: move object
window.addEventListener("mousemove", function () {
  moveObject();
});

// Close editor
document.getElementById("close").addEventListener("click", () => {
  const editorUI = document.getElementsByClassName("editor");
  const menuUI = document.getElementById("ui");

  btnPlaying.innerHTML = "Play";
  btnPlaying.classList.remove("active");

  editorOptions.playing = false;
  editorOptions.enabled = false;
  editorOptions.level.collecteds = [];
  editorOptions.level.platforms = [];

  unSelect();

  editorUI[0].classList.add("hide");
  player.setPosition(30, 600);
  menuOptions.mainMenu = true;
  gameOptions.startGame = false;
  menuUI.style.display = "block";
  gameManager.resize(canvas, context, canvasWidth, canvasHeight);
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
      if (editorOptions.enabled) {
        return;
      }
      const menuUI = document.getElementById("ui");
      menuOptions.mainMenu = true;
      gameOptions.startGame = false;
      menuUI.style.display = "block";
      gameManager.resize(canvas, context, canvasWidth, canvasHeight);
    }
  }
  if (keyState[KEYS.Del]) {
    if (editorOptions.enabled) {
      if (editorOptions.selectedObj !== null) deleteObject();
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
