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

const createUniquePositionClosure = function () {
  const boxArr = [];
  const map = document.querySelector("main");
  const languageWrapper = document.querySelector("#languages");
  const rect = map.getBoundingClientRect();
  const boxSize = 100;

  ///************************************////
  // ************************************////
  const getRandomPosition = () => ({
    randomX: randomNumber(0, rect.width - boxSize),
    randomY: randomNumber(0, rect.height - boxSize),
  });

  const isOverlapping = (arr) =>
    arr.some(
      (el) =>
        Math.abs(el.x - randomX) < boxSize &&
        Math.abs(el.y - randomY) < boxSize,
    );

  const createBox = () =>
    new Box(randomX, randomY, "rgb(255,255,255)", boxSize);

  const renderBox = () => {
    const html = `<div class="ball" style="width: ${box.size}px; height: ${box.size}px; left: ${box.x}px; top: ${box.y}px; background-color: ${box.color}">${language}: ${i}</div>`;
    languageWrapper.insertAdjacentHTML("beforeend", html);
  };
  ///************************************////
  // ************************************////

  return function uniquePosition(language, i) {
    const boxSize = 100;
    //TODO: get random positions
    const randomX = randomNumber(0, rect.width - boxSize);
    const randomY = randomNumber(0, rect.height - boxSize);
    //TODO: check overlap
    const overlaps = boxArr.some(
      (el) =>
        Math.abs(el.x - randomX) < boxSize &&
        Math.abs(el.y - randomY) < boxSize,
    );
    if (overlaps) {
      return uniquePosition(language, i);
    }
    //TODO: create box
    const box = new Box(randomX, randomY, "rgb(255,255,255)", boxSize);
    boxArr.push(box);
    //TODO: separate this to new func --- renderBox
    const html = `<div class="ball" style="width: ${box.size}px; height: ${box.size}px; left: ${box.x}px; top: ${box.y}px; background-color: ${box.color}">${language}: ${i}</div>`;
    languageWrapper.insertAdjacentHTML("beforeend", html);
    return boxArr;
  };
};

const uniquePosition = createUniquePositionClosure();
export { randomNumber, randomColor, Box, uniquePosition };
