export default ({
  fruits,
  time,
}, {
  fruitExpirationDelay: delay,
}) => ({
  fruits: fruits.filter(f => time - f.createdAt <= delay),
});
