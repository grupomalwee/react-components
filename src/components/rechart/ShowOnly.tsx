import React from "react";
import { motion } from "framer-motion";
import { ButtonBase } from "../ui/ButtonBase";
import { cn } from "../../lib/utils";
import { Eye, EyeSlash } from "@phosphor-icons/react";

interface Props {
  showOnlyHighlighted: boolean;
  setShowOnlyHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
  highlightedSeriesSize: number;
  clearHighlights: () => void;
}

/**
 * ShowOnly
 * - Botão principal alterna entre mostrar somente os itens destacados ou mostrar todos
 * - Botão secundário limpa os destaques quando houver algum
 * - Acessibilidade: aria-pressed, aria-labels e estados desabilitados
 */
const ShowOnly: React.FC<Props> = ({
  showOnlyHighlighted,
  setShowOnlyHighlighted,
  highlightedSeriesSize,
}) => {
  const hasHighlights = highlightedSeriesSize > 0;
  if (!hasHighlights) return null;

  return (
    <div className="ml-auto flex items-center gap-2">
      <motion.div
        whileTap={{ scale: hasHighlights ? 0.985 : 1 }}
        whileHover={{ y: hasHighlights ? -2 : 0 }}
      >
        <ButtonBase
          variant="secondary"
          onClick={() => hasHighlights && setShowOnlyHighlighted((v) => !v)}
          aria-pressed={showOnlyHighlighted}
          aria-label={
            showOnlyHighlighted ? "Exibir todos" : "Mostrar somente destacados"
          }
          title={
            showOnlyHighlighted ? "Exibir todos" : "Mostrar somente destacados"
          }
          disabled={!hasHighlights}
          className={cn(
            "flex items-center justify-center gap-2 text-sm h-8 min-w-[2rem] px-2.5 rounded-md transition-shadow",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60",
            !hasHighlights
              ? "opacity-60 cursor-not-allowed pointer-events-none"
              : showOnlyHighlighted
              ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
              : "bg-transparent text-muted-foreground border border-transparent hover:bg-muted/10 hover:text-foreground"
          )}
        >
          {showOnlyHighlighted ? (
            <>
              <EyeSlash size={16} weight="regular" />
              <span className="sr-only">Exibir todos</span>
            </>
          ) : (
            <>
              <Eye size={16} weight="bold" />
              <span className="sr-only">Mostrar somente destacados</span>
            </>
          )}
        </ButtonBase>
      </motion.div>
    </div>
  );
};

export default ShowOnly;
