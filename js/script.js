// "use strict";

import { randomNumber, randomColor, Box } from './utils.mjs';
import { placeLanguageNode } from './language-nodes.mjs';
import { fetchData, langFile, langURL } from './fetch-manager.mjs';
import { setSVGViewBox, worldMap } from './map-manager.mjs';
import { displayBoxes } from './ui/ui.mjs';

const allCountries = document.querySelectorAll('path');
allCountries.forEach(country => {
  country.setAttribute('fill', '#90d5ff');
  country.setAttribute('filter', 'blur(0.5px)');
});

setSVGViewBox();
displayBoxes();

let viewing = false;

const boxesContainer = document.querySelector('#languages');
boxesContainer.addEventListener('click', async function (e) {
  if (!e.target || !e.target.classList.contains('box')) {
    return;
  }

  viewing = true;
  const languageNode = e.target;
  const allBoxes = document.querySelectorAll('.box');

  if (viewing) {
    const language = languageNode.getAttribute('data-name');
    const url = `${langURL}${language}`;
    const countries = await fetchData(url);
    console.log(countries);
    const countryIDs = countries.map(country => country.cca2);

    const filtered = [...allCountries].filter(country =>
      countryIDs.some(id => id === country.id),
    );

    allBoxes.forEach(box => (box.style.opacity = '0.2'));

    filtered.forEach(path => {
      path.setAttribute('fill', randomColor());
      path.setAttribute('filter', 'blur(0px)');
    });
  }

  languageNode.addEventListener('mouseleave', () => {
    viewing = false;
    allBoxes.forEach(box => (box.style.opacity = '1'));
    allCountries.forEach(country => {
      country.setAttribute('fill', '#90d5ff');
      country.setAttribute('filter', 'blur(0.5px)');
    });
  });
});
