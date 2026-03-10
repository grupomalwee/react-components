import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
  } = {},
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrl, meta, shift, alt } = options;

      const isKeyMatch = event.key.toLowerCase() === key.toLowerCase();
      const isCtrlMatch = ctrl === undefined || event.ctrlKey === ctrl;
      const isMetaMatch = meta === undefined || event.metaKey === meta;
      const isShiftMatch = shift === undefined || event.shiftKey === shift;
      const isAltMatch = alt === undefined || event.altKey === alt;

      if (
        isKeyMatch &&
        isCtrlMatch &&
        isMetaMatch &&
        isShiftMatch &&
        isAltMatch
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, options]);
}
