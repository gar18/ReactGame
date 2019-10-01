import * as React from 'react';

const Snake = ({ segments }) => segments.map(({ x: cx, y: cy, ...rest }, index) => (
  <circle
    {...{ cx, cy, ...rest }}
    style={{
      fill: 'navy',
      fillOpacity: 1 - (index / segments.length),
    }}
   />
));

export default Snake;
