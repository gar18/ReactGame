export default ({
  segments: [head],
  fruits,
  growth,
}) => {
  const remainingFruits = fruits
    .filter(f => !f.collidesWith(head));
  return {
    fruits: remainingFruits,
    growth: growth + fruits.length - remainingFruits.length,
  };
};
