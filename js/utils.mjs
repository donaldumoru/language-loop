const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = function () {
  return `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`;
};

class Box {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
}

export { randomNumber, randomColor, Box };
