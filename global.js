export const menuOptions = {
  mainMenu: true,
};

export const gameOptions = {
  startGame: false,
};

export const editorOptions = {
  selectedObj: null,
  enabled: false,
  playing: false,
  level: {
    player: { x: 0, y: 0 },
    platforms: [],
    collecteds: [],
  },
};

export const levelOptions = {
  levels: [],
  currentLevel: 0,

  resetLevel() {
    localStorage.setItem("currentLevel", 0);
  },

  saveLevel() {
    localStorage.setItem("currentLevel", this.currentLevel);
  },

  loadLevel() {
    this.currentLevel = Number(localStorage.getItem("currentLevel"));
  },
};

export const playerOptions = {
  size: 56,
  speed: 11,
};
