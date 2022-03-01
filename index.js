import PanelMain from "./ui/panels/main.js";
import MessageNavigate from "./ui/messages/navigate.js";
import MessageVersion from "./ui/messages/version.js";

const panelMain = new PanelMain();
const messageNavigate = new MessageNavigate();
const messageVersion = new MessageVersion();

//#region EVENTS
window.addEventListener("load", function () {
  switchPanel("main");
  panelMain.create();
  messageNavigate.create();
  messageVersion.create();
});

window.addEventListener("keydown", function () {
  panelMain.navigate();
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

// let keyState = [];

// function onKeyDown(event) {
//   keyState[event.key] = true;
// }

// function onKeyUp(event) {
//   keyState[event.key] = false;
// }

// // window.addEventListener("keydown", onKeyDown);
// // window.addEventListener("keyup", onKeyUp);

// // const player1 = new Player(15, 600, "green");
// const input = new Input();

// // const CANVAS = document.getElementById("canvas");
// // const CONTEXT = canvas.getContext("2d");

// const WIDTH = 1280;
// const HEIGHT = 720;
// let CANVAS_WIDTH = 1280;
// let CANVAS_HEIGHT = 720;

// let level_01 = [
//   [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];

// var mapPositionX = 0;
// var mapPositionY = 0;

// const BLOCK_SIZE = 60;

// // function drawMap() {
// //   for (let i = 0; i < level_01.length; i++) {
// //     for (let j = 0; j < level_01[i].length; j++) {
// //       switch (level_01[i][j]) {
// //         case 0:
// //           CONTEXT.fillStyle = "red";
// //           CONTEXT.fillRect(mapPositionX, mapPositionY, BLOCK_SIZE, BLOCK_SIZE);
// //           break;
// //         case 1:
// //           CONTEXT.fillStyle = "red";
// //           CONTEXT.fillRect(mapPositionX, mapPositionY, BLOCK_SIZE, BLOCK_SIZE);
// //           break;
// //         case 2:
// //           CONTEXT.fillStyle = "red";
// //           CONTEXT.fillRect(mapPositionX, mapPositionY, BLOCK_SIZE, BLOCK_SIZE);
// //           break;
// //         case 3:
// //           CONTEXT.fillStyle = "red";
// //           CONTEXT.fillRect(mapPositionX, mapPositionY, BLOCK_SIZE, BLOCK_SIZE);
// //           break;
// //       }
// //       mapPositionX += BLOCK_SIZE;
// //     }
// //     mapPositionX = 0;
// //     mapPositionY += BLOCK_SIZE;
// //   }
// // }

// // //#region PLAYER
// // function Player(x, y, color) {
// //   this.x = x;
// //   this.y = y;
// //   this.w = 40;
// //   this.h = 60;
// //   this.speed = 5;
// //   this.color = color;
// // }

// // Player.prototype.draw = function () {
// //   CONTEXT.fillStyle = this.color;
// //   CONTEXT.fillRect(this.x, this.y, this.w, this.h);
// // };

// // Player.prototype.move = function () {
// //   this.x++;
// // };

// // Player.prototype.collision = function (x, y) {
// //   if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
// //     return true;
// //   }
// // };
// //#endregion

// //#region INPUT
// function Input() {
//   this.keys = {
//     W: "w",
//     A: "a",
//     S: "s",
//     D: "d",
//     ArrowUp: "ArrowUp",
//     ArrowLeft: "ArrowLeft",
//     ArrowDown: "ArrowDown",
//     ArrowRight: "ArrowRight",
//     Spacebar: " "
//   };
// }

// // Input.prototype.keyDetect = function () {
// //   if (keyState[this.keys.W]) {
// //     player1.y -= player1.speed;
// //   }
// //   if (keyState[this.keys.A]) {
// //     player1.x -= player1.speed;
// //   }
// //   if (keyState[this.keys.S]) {
// //     player1.y += player1.speed;
// //   }
// //   if (keyState[this.keys.D]) {
// //     player1.x += player1.speed;
// //   }
// // };

// // let resizeCanvas = function () {
// //   CANVAS_WIDTH = window.innerWidth;
// //   CANVAS_HEIGHT = window.innerHeight;

// //   let ratio = 16 / 9;
// //   if (CANVAS_HEIGHT < CANVAS_WIDTH / ratio)
// //     CANVAS_WIDTH = CANVAS_HEIGHT * ratio;
// //   else CANVAS_HEIGHT = CANVAS_WIDTH / ratio;

// //   CANVAS.width = WIDTH;
// //   CANVAS.height = HEIGHT;
// //   CONTEXT.mozImageSmoothingEnabled = true;
// //   CONTEXT.webkitImageSmoothingEnabled = true;
// //   CONTEXT.msImageSmoothingEnabled = true;
// //   CONTEXT.imageSmoothingEnabled = true;

// //   CANVAS.style.width = "" + CANVAS_WIDTH + "px";
// //   CANVAS.style.height = "" + CANVAS_HEIGHT + "px";
// // };

// // resizeCanvas();

// // window.addEventListener("resize", function () {
// //   resizeCanvas();
// // });

// const update = () => {
//   // CONTEXT.clearRect(0, 0, WIDTH, HEIGHT);
//   // drawMap();
//   // player1.draw();
//   // input.keyDetect();
//   // requestAnimationFrame(update);
// };

// update();
// ////////////////////////////////////////////
