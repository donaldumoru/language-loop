import { buildLanguageBoxes } from '../language-nodes.mjs';

const languageWrapper = document.querySelector('#languages');
const rect = languageWrapper.getBoundingClientRect();

const renderBox = (box, lang, index) => {
  const html = `<div class="box" data-name="${lang.toLowerCase()}" style="width: ${box.size}px; height: ${box.size}px; left: ${box.x}px; top: ${box.y}px; background-color: ${box.color}">${lang}: ${index}</div>`;
  languageWrapper.insertAdjacentHTML('beforeend', html);
};

const displayBoxes = function (arr) {
  const placeLanguageNode = buildLanguageBoxes();
  arr.forEach((language, i) => {
    const { code } = language;
    const box = placeLanguageNode(code);
    const { name } = language;
    renderBox(box, name, i + 1);
  });
};

export { displayBoxes };
