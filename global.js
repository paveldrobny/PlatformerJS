export const menuOptions = {
  _mainMenu: true,

  get mainMenu() {
    return this._mainMenu;
  },

  set mainMenu(value) {
    this._mainMenu = value;
  }
};

export const gameOptions = {
  _startGame: false,

  get startGame() {
    return this._startGame;
  },

  set startGame(value) {
    this._startGame = value;
  }
};

export const editorOptions = {
  _enabled: false,
  _playing: false,
  _level: {
    player: { x: 0, y: 0 },
    platforms: [],
    collecteds: []
  },

  get enabled() {
    return this._enabled;
  },

  set enabled(value) {
    this._enabled = value;
  },

  get playing() {
    return this._playing;
  },

  set playing(value) {
    this._playing = value;
  },

  get level() {
    return this._level;
  },

  set level(value) {
    this._level = value;
  }
};

export const levelOptions = {
  _levels: [],
  _currentLevel: 0,

  resetLevel() {
    localStorage.setItem("currentLevel", 0);
  },

  saveLevel() {
    localStorage.setItem("currentLevel", this._currentLevel);
  },

  loadLevel() {
    this._currentLevel = Number(localStorage.getItem("currentLevel"));
  },

  get levels() {
    return this._levels;
  },

  set levels(value) {
    this._levels = value;
  },

  get currentLevel() {
    return this._currentLevel;
  },

  set currentLevel(value) {
    this._currentLevel = value;
  }
};

export const playerOptions = {
  _size: 56,
  _speed: 11,

  get size() {
    return this._size;
  },

  get speed() {
    return this._speed;
  }
};
