let menuIndex = 0;

document.addEventListener("keydown", function (event) {
  const items = document.getElementsByClassName("items");

  if (event.key == "w" || event.key == "ArrowUp") {
    if (menuIndex <= 0) return;
    menuIndex--;
  }

  if (event.key == "s" || event.key == "ArrowDown") {
    if (menuIndex >= items.length - 1) return;
    menuIndex++;
  }

  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("selected");
    items[menuIndex].classList.add("selected");
  }
});
