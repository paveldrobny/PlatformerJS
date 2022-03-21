export const menuOptions = {
  _mainMenu: true,

  get mainMenu() {
    return this._mainMenu;
  },

  set mainMenu(value) {
    this._mainMenu = value;
  }
};

export const editorOptions = {
  _enabled: false,

  get enabled() {
    return this._enabled;
  },

  set enabled(value) {
    this._enabled = value;
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
