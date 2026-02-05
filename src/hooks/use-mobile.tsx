import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const checkIsMobile = () => {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0;

      const isSmallScreen = window.innerWidth < MOBILE_BREAKPOINT;

      return isTouch || isSmallScreen;
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const touchMql = window.matchMedia("(pointer: coarse)");

    const onChange = () => {
      setIsMobile(checkIsMobile());
    };

    mql.addEventListener("change", onChange);
    touchMql.addEventListener("change", onChange);
    setIsMobile(checkIsMobile());

    return () => {
      mql.removeEventListener("change", onChange);
      touchMql.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
}
