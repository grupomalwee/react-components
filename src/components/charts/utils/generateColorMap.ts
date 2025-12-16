import { generateAdditionalColors } from "./helpers";

export function generateColors(
  dataKeys: string[],
  colors: string[],
  mapperConfig: Record<string, { color?: string } | undefined>
) {
  const colorMap: Record<string, string> = {};
  const allColors = generateAdditionalColors(colors, dataKeys.length);

  dataKeys.forEach((key, index) => {
    colorMap[key] =
      mapperConfig[key]?.color ||
      allColors[index] ||
      colors[index % colors.length];
  });

  return colorMap;
}
