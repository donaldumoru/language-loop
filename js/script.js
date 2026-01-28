import {
  randomColor,
  languageNode,
  setCountryFill,
  makeCountryCard,
} from './utils.mjs';
import { ccaURL, fetchData, langFile, langURL } from './fetch-manager.mjs';
import { setSVGViewBox, worldMap } from './map-manager.mjs';
//prettier-ignore
import { displayBoxes, highlightCountries,showLanguageNodes, arr } from './ui/ui.mjs';

setSVGViewBox();
makeCountryCard();
const languages = await fetchData(langFile);
displayBoxes(languages);
const allCountries = document.querySelectorAll('path');
const resetFillObj = { blur: 'blur(0.5px)' };
setCountryFill(allCountries, resetFillObj);

const showCountries = highlightCountries.bind(allCountries);
const boxesContainer = document.querySelector('#languages');
boxesContainer.addEventListener('click', showCountries);
worldMap.addEventListener('click', showLanguageNodes);

let currentlyHovered;

const countryWrapper = document.querySelector('.country-card');
const countryNameEL = document.querySelector('.country-card-title');
const countryImg = document.querySelector('.country-card').querySelector('img');
const countryRegionEL = document.querySelector('.country-card-region');
const languagesSpokenEl = document.querySelector('.country-card-languages');

worldMap.addEventListener('mouseover', function (e) {
  if (e.target.tagName !== 'path' || !arr) {
    return;
  }
  const countryID = e.target.id;
  const country = arr.find(country => country.id === countryID);

  if (!country) {
    return;
  }

  currentlyHovered = country.id;
  console.log(country);

  countryNameEL.textContent = country.name?.common;
  countryImg.src = country.flag;
  countryRegionEL.textContent = country.region?.subregion;
  countryWrapper.style.visibility = 'visible';

  const languages = Object.values(country.languages);
  languagesSpokenEl.innerHTML = '';
  languages.forEach(lang => {
    const languageEl = document.createElement('p');
    languageEl.textContent = lang;
    languagesSpokenEl.append(languageEl);
  });
});

worldMap.addEventListener('mouseout', function (e) {
  if (e.target.tagName !== 'path' || !arr) {
    return;
  }

  const currentID = e.target.id;
  const arrayContainsCurrent = arr.some(el => el.id === currentID);

  if (!arrayContainsCurrent) {
    return;
  }

  const card = document.querySelector('.country-card');
  card.style.visibility = 'hidden';
});
