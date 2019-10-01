const vectorFromDegrees = (direction) => {
  const rad = direction * Math.PI / 180;
  return [Math.sin(rad), -Math.cos(rad)];
}

const vectorAdd = ([ax, ay], [bx, by]) => [ax + bx, ay + by];
const vectorMultiply = ([dx, dy], mul) => [dx * mul, dy * mul];

let count = 0;

export default class SnakeObject {
  constructor(props) {
    const { key = count++ } = props;
    Object.assign(this, props, { key });
  }

  collidesWith(b) {
    const a = this;
    return (a.r + b.r) > Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
    );
  }

  cloneWith(props) {
    return new this.constructor({ ...this, ...props });
  }

  cloneMovedBy({
    direction,
    distance,
    height: h,
    width: w,
  }, props) {
    const [x, y] = vectorAdd(
      [this.x, this.y],
      vectorMultiply(vectorFromDegrees(direction), distance),
    );
    return this.cloneWith({
      x: ((x % w) + w) % w,
      y: ((y % h) + h) % h,
      ...props,
    });
  }
}
