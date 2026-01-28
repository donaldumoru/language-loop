const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = function () {
  return `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
};

const setCountryFill = function (arr, { color = '#90d5ff', blur }) {
  arr.forEach(el => {
    el.setAttribute('fill', typeof color !== 'string' ? color() : color);
    el.setAttribute('filter', blur);
  });
};

class languageNode {
  constructor(x, y, languageCode, color, size) {
    this.x = x;
    this.y = y;
    this.languageCode = languageCode;
    this.color = color;
    this.size = size;
  }
}

class countryInfo {
  constructor(id, name, flag, region, languages) {
    this.id = id;
    this.name = name;
    this.flag = flag;
    this.region = region;
    this.languages = languages;
  }
}

const makeCountryCard = function () {
  const html = `
      <div class="card2">
        <img
          src=""
          alt=""
        />
        <div class="card2-title"></div>
        <div class="card2-description"></div>
        <div class="details"></div>
      </div>`;

  const main = document.querySelector('main');
  main.insertAdjacentHTML('beforeend', html);
};

export {
  randomNumber,
  randomColor,
  setCountryFill,
  languageNode,
  countryInfo,
  makeCountryCard,
};
