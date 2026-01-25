const worldMap = document.querySelector("svg");

const setSVGViewBox = function () {
  requestAnimationFrame(() => {
    const box = worldMap.getBBox();
    worldMap.setAttribute(
      "viewBox",
      `${box.x} ${box.y} ${box.width} ${box.height}`,
    );
  });
};

export { setSVGViewBox, worldMap };
