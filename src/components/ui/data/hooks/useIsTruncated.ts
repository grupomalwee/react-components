import { useState, useEffect } from "react";

export const useIsTruncated = (ref: React.RefObject<HTMLElement | null>) => {
  const [truncated, setTruncated] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setTruncated(el.scrollWidth > el.offsetWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return truncated;
};
