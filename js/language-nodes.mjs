import { Box, randomNumber } from './utils.mjs';
import { fetchData, langFile, langURL } from './fetch-manager.mjs';

const buildLanguageBoxes = function () {
  const boxArr = [];
  const map = document.querySelector('main');
  const rect = map.getBoundingClientRect();

  const getRandomPosition = boxSize => ({
    x: randomNumber(0, rect.width - boxSize),
    y: randomNumber(0, rect.height - boxSize),
  });

  const intersects = (arr, randomX, randomY, boxSize) =>
    arr.some(
      el =>
        Math.abs(el.x - randomX) < boxSize &&
        Math.abs(el.y - randomY) < boxSize,
    );

  const createBox = (randomX, randomY, languageCode, color, size) => {
    return new Box(randomX, randomY, languageCode, color, size);
  };

  //   const makeBoxSize = numCountries => {
  //     //Logic here and replace the boxSize in uniquePosition to use the returned value from here
  //     return randomNumber(100, 200);
  //   };

  return function placeLanguageNode(language) {
    const boxSize = 100;
    const position = getRandomPosition(boxSize);
    const { x, y } = position;
    const isIntersecting = intersects(boxArr, x, y, boxSize);
    if (isIntersecting) {
      return placeLanguageNode(language);
    }

    const box = createBox(x, y, language, 'rgb(255,255,255)', boxSize);
    boxArr.push(box);
    return box;
  };
};

export { buildLanguageBoxes };
