export default ({ segments }) => ({
  running: !segments.slice(2).some(s => s.collidesWith(segments[0])),
});
