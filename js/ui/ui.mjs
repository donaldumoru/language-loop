import { buildLanguageBoxes } from '../language-nodes.mjs';
import { ccaURL, fetchData, langFile, langURL } from '../fetch-manager.mjs';
import { setCountryFill, randomColor, countryInfo } from '../utils.mjs';

const languageWrapper = document.querySelector('#languages');
const rect = languageWrapper.getBoundingClientRect();

const renderBox = (box, lang) => {
  const html = `<div class="box" data-name="${lang.toLowerCase()}" style="width: ${box.size}px; height: ${box.size}px; left: ${box.x}px; top: ${box.y}px; background-color: ${box.color}">${lang}</div>`;
  languageWrapper.insertAdjacentHTML('beforeend', html);
};

const displayBoxes = function (arr) {
  const placeLanguageNode = buildLanguageBoxes();
  arr.forEach((language, i) => {
    const { code } = language;
    const languageNode = placeLanguageNode(code);
    const { name } = language;
    renderBox(languageNode, name);
  });
};

//TODO: fix!
let viewing = false;

const countriesInfo = countries =>
  countries.map(
    country =>
      new countryInfo(
        country?.cca2,
        country?.name,
        country?.flags.svg || country?.flags.png,
        {
          region: country?.region,
          subregion: country?.subregion,
          continent: country?.continents,
        },
        country?.languages,
      ),
  );

let arr;

const highlightCountries = async function (e) {
  if (!e.target || !e.target.classList.contains('box')) {
    return;
  }

  const boxesContainer = e.currentTarget;
  const resetFillObj = { blur: 'blur(0.5px)' };
  const allCountries = this;

  viewing = true;
  const languageNode = e.target;
  const allBoxes = document.querySelectorAll('.box');

  if (viewing) {
    const language = languageNode.getAttribute('data-name');
    const url = `${langURL}${language}`;
    const countries = await fetchData(url);
    arr = countriesInfo(countries);

    const countryIDs = countries.map(country => country.cca2);

    const filtered = [...allCountries].filter(country =>
      countryIDs.some(id => id === country.id),
    );

    setCountryFill(allCountries, resetFillObj);
    setCountryFill(filtered, { color: randomColor, blur: 'blur(0px)' });
    boxesContainer.innerHTML = '';
  }
};

const showLanguageNodes = async function (e) {
  if (e.target.tagName !== 'path') {
    return;
  }

  const ccaCode = e.target.id;
  if (!ccaCode) {
    return;
  }

  const boxesContainer = e.currentTarget.parentElement.nextElementSibling;

  const url = `${ccaURL}${ccaCode}`;
  const [country] = await fetchData(url);

  const languages = Object.entries(country.languages).reduce((acc, curr) => {
    const [code, name] = curr;
    const language = { code: code, name: name };
    acc = [...acc, language];
    return acc;
  }, []);

  boxesContainer.innerHTML = '';
  boxesContainer.style.visibility = 'visible';
  displayBoxes(languages);
};

export { displayBoxes, highlightCountries, showLanguageNodes, arr };
