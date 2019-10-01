export default ({
  segments,
  direction,
  trail: previousTrail,
  time,
  deltaTime,
}, {
  width,
  height,
  snakeSpeed,
}) => {
  const distance = deltaTime * snakeSpeed;
  const { x, y } = segments[0].cloneMovedBy({
    direction,
    distance,
    width,
    height,
  });
  const trail = [{
    direction: direction + 180,
    distance,
  }, ...previousTrail];
  return {
    trail,
    segments: segments.map(s => trail.reduce(({
      segment,
      trailOffset,
    }, {
      direction: trailDirection,
      distance: trailDistance,
    }) => ({
      segment,
      trailOffset: trailOffset + trailDistance,
      ...(segment.offset > trailOffset && {
        segment: segment.cloneMovedBy({
          direction: trailDirection,
          distance: Math.min(
            segment.offset - trailOffset,
            trailDistance,
          ),
          width,
          height,
        }, { trailDirection }),
      }),
    }), {
      segment: s.cloneWith({ x, y }),
      trailOffset: 0,
    }).segment),
  };
}
