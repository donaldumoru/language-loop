import { languages } from "../fetch-manager.mjs";
import { uniquePosition } from "../utils.mjs";

const languageWrapper = document.querySelector("#languages");
const rect = languageWrapper.getBoundingClientRect();

const displayBoxes = function (arr) {
  languages.forEach((language) => {
    uniquePosition();
  });

  arr.forEach((box, index) => {
    const html = `<div class="ball" style="width: ${box.size}px; height: ${box.size}px; left: ${box.x}px; top: ${box.y}px; background-color: ${box.color}">${languages[index].name}</div>`;
    languageWrapper.insertAdjacentHTML("beforeend", html);
  });
};

export { displayBoxes };
