export default class PanelBase {
  constructor() {
    this.svgNS = "http://www.w3.org/2000/svg";
    this.itemsHeight = 45;
  }

  create(panelName, titleName, length, itemsID, itemsPositionY, itemsText) {
    const panel = document.getElementById(`${panelName}`);
    const title = document.createElementNS(this.svgNS, "text");

    title.setAttributeNS(null, "id", "title");
    title.setAttributeNS(null, "y", "-230");
    title.innerHTML = `${titleName}`;

    panel.appendChild(title);

    for (let i = 0; i < length; i++) {
      const item = document.createElementNS(this.svgNS, "text");

      item.setAttributeNS(null, "id", `item-${itemsID[i]}`);
      item.setAttributeNS(null, "class", `items ${panelName}`);
      item.setAttributeNS(null, "y", itemsPositionY);
      item.innerHTML = itemsText[i];

      if (i == 0) {
        item.setAttributeNS(null, "class", `items ${panelName} selected`);
      }

      itemsPositionY += this.itemsHeight;

      panel.appendChild(item);
    }
  }

  navigate(panel, selectedIndex) {
    const items = document.getElementsByClassName(`items ${panel}`);

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("selected");
    }
    items[selectedIndex].classList.add("selected");
  }
}
