export const random = (min: number, max: number = 0) => {
  if (min > max) {
    const hold = max;
    max = min;
    min = hold;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const maxOrbit = (x: number, y: number) => {
  const max = Math.max(x, y);
  const diameter = Math.round(Math.sqrt(x * x + y * y));
  return diameter / 2;
  // return Math.ceil(Math.sqrt(0.5 * (x + x + y + y)));
};
