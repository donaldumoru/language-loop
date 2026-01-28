import { randomColor, Box, setCountryFill } from './utils.mjs';
import { ccaURL, fetchData, langFile, langURL } from './fetch-manager.mjs';
import { setSVGViewBox, worldMap } from './map-manager.mjs';
import { displayBoxes } from './ui/ui.mjs';
setSVGViewBox();

const languages = await fetchData(langFile);
const allCountries = document.querySelectorAll('path');
const resetFillObj = { blur: 'blur(0.5px)' };
setCountryFill(allCountries, resetFillObj);
displayBoxes(languages);

let viewing = false;

const highlightCountries = async function (e) {
  viewing = true;
  const languageNode = e.target;
  const allBoxes = document.querySelectorAll('.box');

  if (viewing) {
    const language = languageNode.getAttribute('data-name');
    const url = `${langURL}${language}`;
    const countries = await fetchData(url);
    const countryIDs = countries.map(country => country.cca2);

    const filtered = [...allCountries].filter(country =>
      countryIDs.some(id => id === country.id),
    );

    setCountryFill(allCountries, resetFillObj);
    setCountryFill(filtered, { color: randomColor, blur: 'blur(0px)' });
    boxesContainer.innerHTML = '';
  }
};

const boxesContainer = document.querySelector('#languages');
boxesContainer.addEventListener('click', function (e) {
  if (!e.target || !e.target.classList.contains('box')) {
    return;
  }

  highlightCountries(e);
});

worldMap.addEventListener('click', async function (e) {
  if (e.target.tagName !== 'path') {
    return;
  }

  const ccaCode = e.target.id;
  if (!ccaCode) {
    return;
  }

  const url = `${ccaURL}${ccaCode}`;
  const [country] = await fetchData(url);

  const languages = Object.entries(country.languages).reduce((acc, curr) => {
    const [code, name] = curr;
    const language = { code: code, name: name };
    acc.push(language);
    return acc;
  }, []);

  boxesContainer.innerHTML = '';
  boxesContainer.style.visibility = 'visible';
  displayBoxes(languages);
});
