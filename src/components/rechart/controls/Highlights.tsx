import React from "react";
import { ButtonBase } from "../../ui/ButtonBase";
import { cn } from "../../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

interface MapperEntry {
  label?: string;
  formatter?: (value: string | number) => string | number;
  color?: string;
  type?: string;
  visible?: boolean;
}

interface Props {
  allKeys: string[];
  mapperConfig: Record<string, MapperEntry>;
  finalColors: Record<string, string>;
  highlightedSeries: Set<string>;
  toggleHighlight: (key: string) => void;
  containerWidth?: number;
}

const Highlights: React.FC<Props> = ({
  allKeys,
  mapperConfig,
  finalColors,
  highlightedSeries,
  toggleHighlight,
  containerWidth,
}) => {
  const count = allKeys.length || 1;
  const available = containerWidth && containerWidth > 0 ? containerWidth : 600;
  const perPill = Math.floor(available / count);

  const showFullLabel = perPill >= 96;
  const showShortLabel = perPill >= 64;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };

  return (
    <motion.div
      className="flex-1 flex items-center gap-2 flex-wrap"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {allKeys.map((k) => {
          const isHighlighted = highlightedSeries.has(k);
          const label = mapperConfig[k]?.label ?? k;
          const color = finalColors[k];

          const pillClasses = cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition-all select-none relative overflow-hidden",
            isHighlighted ? "pr-8" : "",
            isHighlighted
              ? "bg-card/95 border-2 text-foreground shadow-[0_6px_18px_rgba(0,0,0,0.12)]"
              : "bg-muted/10 border-border text-muted-foreground hover:bg-muted/5"
          );

          return (
            <motion.div
              layout
              initial="hidden"
              animate="visible"
              exit="exit"
              key={`pill-${k}`}
            >
              <ButtonBase
                asChild={true}
                variant={"ghost"}
                onClick={() => toggleHighlight(k)}
                title={isHighlighted ? `Desativar ${label}` : `Ativar ${label}`}
                className={pillClasses}
                style={{ minWidth: showFullLabel ? undefined : 36 }}
                aria-pressed={isHighlighted}
              >
                <motion.button
                  whileHover={{ scale: isHighlighted ? 1.04 : 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  animate={isHighlighted ? { scale: 1.02 } : { scale: 1 }}
                  className="flex items-center gap-2 min-w-0 pr-2"
                >
                  <motion.span
                    className={cn("w-3 h-3 rounded-sm flex-shrink-0 border")}
                    style={{
                      backgroundColor: color,
                      borderColor: isHighlighted ? color : "transparent",
                      boxShadow: isHighlighted
                        ? `0 6px 20px ${color}33`
                        : undefined,
                    }}
                    layout
                    initial={{ scale: 0.8, opacity: 0.9 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />

                  {showFullLabel ? (
                    <motion.span className="truncate max-w-[10rem] pr-2" layout>
                      {label}
                    </motion.span>
                  ) : showShortLabel ? (
                    <motion.span
                      className="truncate max-w-[6rem] text-xs pr-2"
                      layout
                    >
                      {label}
                    </motion.span>
                  ) : null}

                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={
                      isHighlighted
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.6 }
                    }
                    transition={{ type: "spring", stiffness: 450, damping: 28 }}
                    className={cn(
                      "pointer-events-none absolute right-2  -translate-y-1/2 text-xs text-foreground flex items-center justify-center",
                      isHighlighted ? "" : "opacity-0 pointer-events-none"
                    )}
                    style={{ width: 18, height: 18 }}
                  >
                    <CheckIcon />
                  </motion.span>
                </motion.button>
              </ButtonBase>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default Highlights;
