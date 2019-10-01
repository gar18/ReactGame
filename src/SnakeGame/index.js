import * as React from 'react';

import Fruit from './Fruit';
import Snake from './Snake';
import SnakeObject from './SnakeObject';
import * as ruleset from './ruleset/';

const throttle = (fn, timeout) => {
  let wait = false;
  return (...args) => {
    if (!wait) {
      fn(...args);
      wait = true;
      setTimeout(() => wait = false, timeout);
    }
  }
}

export default class SnakeGame extends React.Component {
  static defaultProps = {
    width: 640,
    height: 480,
    backgroundColor: 'white',
    newFruitDelay: 200,
    newFruitProbability: 0.35,
    newFruitSize: 40,
    fruitExpirationDelay: 10 * 1000,
    snakeSpeed: 0.1,
    growthDelay: 150,
  };

  constructor(props) {
    super(props);

    const direction = 90;
    this.state = {
      segments: [
        new SnakeObject({
          x: this.props.width / 2,
          y: this.props.height / 2,
          r: 10,
          offset: 0,
          trailDirection: direction + 180,
        }),
      ],
      direction,
      fruits: [],
      trail: [],
      running: true,
      time: 0,
      deltaTime: 0,
      growth: 8,
      lastGrowthAt: 0,
      lastFruitAt: 0,
    };
    this._onKeyDown = throttle(this._onKeyDown, 100);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._onKeyDown);

    let scheduleNextTick;
    const tick = (time) => {
      const { noCrossing, ...rest } = ruleset;
      this.setState(
        (state, props) => [
          ({ time: prevTime }) => ({
            time,
            deltaTime: time - prevTime,
          }),
          noCrossing,
          ...Object.values(rest),
        ].reduce(
          (s, rule) => ({
            ...s,
            ...(state.running && rule(s, props)),
          }),
          state,
        ),
        scheduleNextTick,
      );
    };
    scheduleNextTick = () => {
      this._requestId = requestAnimationFrame(tick);
    };
    scheduleNextTick();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._requestId);
    document.removeEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown = ({ keyCode }) => this.setState(({ direction }) => {
    switch (keyCode) {
      case 37: /* left */
        return {
          direction: direction - 21,
        };

      case 39: /* right */
        return {
          direction: direction + 21,
        };

      default:
        return null;
    }
  });

  render() {
    const {
      props: { width, height, backgroundColor },
      state: { fruits, segments, time },
    } = this;
    const sec = (time / 1000).toFixed(2);
    return (
      <svg style={{ width, height, backgroundColor }}>
        <text style={{ fontFamily: 'monospace' }} y={20}>
          Score: {sec} s and {segments.length} segments
        </text>
        {fruits.map(fruit => <Fruit {...fruit} />)}
        <Snake {...{ segments }} />
      </svg>
    )
  }
}
