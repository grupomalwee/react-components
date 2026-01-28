import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotsThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

interface Props {
  processedData: Array<{ name: string }>;
  onOpenPeriod: (periodName: string) => void;
  rightOffset?: number; 
  topOffset?: number; 
  activePeriod?: string; 
  activePeriods?: string[]; 
}

const menuVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0 },
};

function PeriodsDropdown({
  processedData,
  onOpenPeriod,
  rightOffset,
  topOffset,
  activePeriod,
  activePeriods,
}: Props) {
  const periods = processedData.map((d) => String(d.name));
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (open && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [open]);

  function handleSelect(p: string) {
    onOpenPeriod(p);
    setOpen(false);
  }

  const containerStyle: React.CSSProperties =
    typeof rightOffset === "number"
      ? { position: "relative", zIndex: 30 }
      : { position: "relative", zIndex: 30 };

  return (
    <div ref={wrapperRef} style={containerStyle} className="mr-4">
      <ButtonBase
        aria-expanded={open}
        variant="ghost"
        size="icon"
        aria-haspopup="menu"
        aria-controls="periods-menu"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") setOpen(true);
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        title={open ? "Fechar lista de períodos" : "Abrir lista de períodos"}
      >
        <DotsThreeIcon size={18} className="rotate-90"/>
        <span className="sr-only">
          {open ? "Fechar períodos" : "Abrir períodos"}
        </span>
        {periods.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ring-1 ring-border">
            {periods.length}
          </span>
        )}
      </ButtonBase>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="bg-card border border-border rounded-lg shadow-lg overflow-hidden ring-1 ring-black/5"
            style={{
              minWidth: 200,
              maxHeight: 260,
              overflow: "hidden",
              position: "absolute",
              top:
                typeof topOffset === "number" ? topOffset : "calc(100% + 6px)",
              right: typeof rightOffset === "number" ? rightOffset : 0,
            }}
            role="menu"
            aria-orientation="vertical"
            id="periods-menu"
          >
            <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
              Períodos
            </div>
            <div className="h-px bg-border" />
            <div
              ref={listRef}
              className="flex flex-col p-2 gap-1"
              style={{ maxHeight: 200, overflowY: "auto" }}
            >
              {periods.map((p, idx) => (
                <motion.button
                  key={p}
                  className={
                    "flex items-center justify-between w-full text-left px-3 py-2.5 rounded focus:outline-none transition-colors " +
                    ((activePeriods && activePeriods.includes(p)) ||
                    p === activePeriod
                      ? "bg-accent/10 font-medium"
                      : "hover:bg-accent/15 focus-visible:ring-2 focus-visible:ring-accent/30")
                  }
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(p)}
                  ref={idx === 0 ? firstItemRef : undefined}
                  role="menuitem"
                  aria-checked={
                    (activePeriods && activePeriods.includes(p)) ||
                    p === activePeriod
                  }
                >
                  <span className="truncate">{p}</span>
                  {((activePeriods && activePeriods.includes(p)) ||
                    p === activePeriod) && (
                    <span className="ml-2 text-primary flex items-center">
                      <Check size={16} weight="bold" />
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PeriodsDropdown;
