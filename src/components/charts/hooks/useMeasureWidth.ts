import { useLayoutEffect, useRef, useState } from "react";

export function useMeasureWidth<T extends HTMLElement = HTMLDivElement>() {
  const wrapperRef = useRef<T | null>(null);
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

  return { wrapperRef, measuredWidth } as const;
}
