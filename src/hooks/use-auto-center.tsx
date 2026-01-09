import { useEffect, useRef, useState } from "react";

export function useAutoCenter(open: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [center, setCenter] = useState(false);

  useEffect(() => {
    if (!open) {
      setCenter(false);
      return;
    }

    let raf = 0;

    const check = () => {
      const el = ref.current;
      if (!el) return setCenter(false);
      const rect = el.getBoundingClientRect();
      const overflow =
        rect.left < 0 || rect.top < 0 || rect.right > window.innerWidth || rect.bottom > window.innerHeight;
      setCenter(Boolean(overflow));
    };

    raf = requestAnimationFrame(check);

    window.addEventListener("resize", check);
    window.addEventListener("scroll", check, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", check);
    };
  }, [open]);

  return { ref, center } as const;
}

export default useAutoCenter;
