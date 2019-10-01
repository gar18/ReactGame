import SnakeObject from '../SnakeObject';

export default ({
  fruits,
  segments,
  time,
  lastFruitAt,
}, {
  width,
  height,
  newFruitProbability,
  newFruitDelay,
  newFruitSize,
}) => {
  if (time < lastFruitAt + newFruitDelay || Math.random() > newFruitProbability) {
    return null;
  }
  if (Math.random() > newFruitProbability) {
    return {
      lastFruitAt: time,
    };
  }
  const newFruit = new SnakeObject({
    x: Math.random() * width,
    y: Math.random() * height,
    r: newFruitSize / 2,
    createdAt: time,
  });
  const gameObjects = fruits.concat(segments);
  if (gameObjects.some(s => s.collidesWith(newFruit))) {
    return null;
  }
  return {
    fruits: fruits.concat(newFruit),
    lastFruitAt: time,
  };
}
