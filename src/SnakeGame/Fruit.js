import * as React from 'react';

import cherries from './cherries.svg';

const Fruit = ({ x, y, r }) => (
  <image
    x={x - r}
    y={y - r}
    height={r * 2}
    width={r * 2}
    xlinkHref={cherries}
  />
);

export default Fruit;
