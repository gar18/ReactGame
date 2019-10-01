export default ({
  segments,
  time,
  growth,
  lastGrowthAt,
}, {
  width,
  height,
  growthDelay,
}) => {
  if (growth === 0 || time < lastGrowthAt + growthDelay) {
    return null;
  }
  const [tailEnd] = segments.slice(-1);
  const distance = tailEnd.r * 2;
  return {
    segments: segments.concat(
      tailEnd.cloneMovedBy({
        direction: tailEnd.trailDirection,
        distance,
        width,
        height,
      }, {
        key: undefined,
        offset: tailEnd.offset + distance,
      }),
    ),
    growth: growth - 1,
    lastGrowthAt: time,
  };
}
