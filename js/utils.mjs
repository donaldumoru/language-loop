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

class Box {
  constructor(x, y, languageCode, color, size) {
    this.x = x;
    this.y = y;
    this.languageCode = languageCode;
    this.color = color;
    this.size = size;
  }
}

export { randomNumber, randomColor, Box, setCountryFill };
