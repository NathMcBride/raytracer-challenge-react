export const clamp = (x: number, minVal: number, maxVal: number) => {
  const m = Math;
  return m.min(m.max(x, minVal), maxVal);
};
