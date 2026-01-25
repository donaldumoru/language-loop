import { Box, randomNumber } from './utils.mjs';
import { fetchData, langFile, langURL } from './fetch-manager.mjs';

const languages = await fetchData(langFile);

const buildLanguageBoxes = function () {
  const boxArr = [];
  const map = document.querySelector('main');
  const rect = map.getBoundingClientRect();
  //   const boxSize = 100;

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

  const createBox = (randomX, randomY, size) => {
    return new Box(randomX, randomY, 'rgb(255,255,255)', size);
  };

  const makeBoxSize = numCountries => {
    //Logic here and replace the boxSize in uniquePosition to use the returned value from here
    return randomNumber(100, 200);
  };

  return function placeLanguageBox(language, i) {
    const boxSize = makeBoxSize();
    const position = getRandomPosition(boxSize);
    const { x, y } = position;
    const isIntersecting = intersects(boxArr, x, y, boxSize);
    if (isIntersecting) {
      return placeLanguageBox(language, i);
    }
    const box = createBox(x, y, boxSize);
    boxArr.push(box);
    return boxArr;
  };
};

const placeLanguageNode = buildLanguageBoxes();
export { placeLanguageNode };
