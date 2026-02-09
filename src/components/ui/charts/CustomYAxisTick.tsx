import React from "react";

interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string | number };
  width?: number;
}

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = (props) => {
  const { x = 0, y = 0, payload } = props;
  const text = String(payload?.value || "");
  const maxCharsPerLine = 20;

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length > maxCharsPerLine && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  const lineHeight = 12;
  const totalHeight = lines.length * lineHeight;
  const startY = y - totalHeight / 2 + lineHeight / 2;

  return (
    <g>
      {lines.map((line, index) => (
        <text
          key={index}
          x={x}
          y={startY + index * lineHeight}
          textAnchor="end"
          fill="hsl(var(--muted-foreground))"
          fontSize={11}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

export default CustomYAxisTick;
