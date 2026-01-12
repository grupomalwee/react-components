import { useState, useRef, useLayoutEffect } from "react";

export const useChartDimensions = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const r = entries[0];
      if (r && typeof r.contentRect.width === "number") {
        setMeasuredWidth(Math.round(r.contentRect.width));
      }
    });
    ro.observe(el);

    setMeasuredWidth(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);

  return { wrapperRef, measuredWidth };
};
