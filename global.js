export const menuOptions = {
  mainMenu: true,

  get isMainMenu() {
    return this.mainMenu;
  },

  set setMainMenu(value) {
    this.mainMenu = value;
  }
};

export const editorOptions = {
  isEditorMode: false,

  get isEditorEnabled() {
    return this.isEditorMode;
  },

  set enableEditorMode(value) {
    this.isEditorMode = value;
  }
};

export const levelOptions = {
  currentLevel: 0,

  get currentLvl() {
    return this.currentLevel;
  },

  set changeLvl(value) {
    this.currentLevel = value;
  }
};
