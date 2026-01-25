// "use strict";

import { randomNumber, randomColor, Box, uniquePosition } from "./utils.mjs";
import { languages } from "./fetch-manager.mjs";
import { setSVGViewBox, worldMap } from "./map-manager.mjs";
import { displayBoxes } from "./ui/ui.mjs";
setSVGViewBox();

// const allCountries = worldMap.querySelectorAll("path");

// displayBoxes(boxArr);

languages.forEach((element, index) => {
  uniquePosition(element.name, index + 1);
});
