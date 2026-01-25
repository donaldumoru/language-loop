import { fetchData, langFile } from '../fetch-manager.mjs';
import { placeLanguageNode } from '../language-nodes.mjs';

const languageWrapper = document.querySelector('#languages');
const rect = languageWrapper.getBoundingClientRect();

const renderBox = (box, lang, index) => {
  const html = `<div class="box" data-name="${lang.toLowerCase()}" style="width: ${box.size}px; height: ${box.size}px; left: ${box.x}px; top: ${box.y}px; background-color: ${box.color}">${lang}: ${index}</div>`;
  languageWrapper.insertAdjacentHTML('beforeend', html);
};

const languages = await fetchData(langFile);
const displayBoxes = function () {
  languages.forEach((language, i) => {
    const boxes = placeLanguageNode();
    const currentBox = boxes[i];
    const { name } = language;
    renderBox(currentBox, name, i + 1);
  });
};

export { displayBoxes };
