export function visualForItem(item: number, value: number) {
  const distance = Math.abs(item - value);
  const capped = Math.min(distance, 4);
  const scale = 1 - capped * 0.08;
  const opacity = 1 - capped * 0.18;
  const translateY = item === value ? -2 : 0;
  return { scale, opacity, translateY, distance };
}

export default visualForItem;
