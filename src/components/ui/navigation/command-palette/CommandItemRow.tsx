import { motion } from "framer-motion";
import { CaretRightIcon } from "@phosphor-icons/react";
import { CommandItem } from "./types";
import { Kbd } from "./Kbd";
import { Badge, type BadgeColorType } from "../../data/Badge";

function HighlightText({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim()) return <>{text}</>;

  const terms = query
    .split(/[, ]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (terms.length === 0) return <>{text}</>;

  const escapedTerms = terms.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some(
          (t) => t.toLowerCase() === part.toLowerCase(),
        );
        return isMatch ? (
          <span key={i} className="text-primary font-semibold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

function mapBadgeVariantToColor(
  variant?: CommandItem["badgeVariant"],
): BadgeColorType | undefined {
  if (!variant) return undefined;
  switch (variant) {
    case "success":
      return "green";
    case "warning":
      return "yellow";
    case "danger":
      return "red";
    case "primary":
      return "blue";
    case "secondary":
      return "purple";
    case "destructive":
      return "red";
    case "muted":
      return "gray";
    case "default":
      return "gray";
    default:
      return undefined;
  }
}

interface CommandItemRowProps {
  item: CommandItem;
  isActive: boolean;
  isSelected?: boolean;
  multiSelect?: boolean;
  onSelect: (e?: React.MouseEvent | React.KeyboardEvent) => void;
  onToggleSelection?: (e: React.MouseEvent) => void;
  onHover: () => void;
  searchQuery?: string;
}

export function CommandItemRow({
  item,
  isActive,
  isSelected,
  multiSelect,
  onSelect,
  onToggleSelection,
  onHover,
  searchQuery,
}: CommandItemRowProps) {
  
  return (
    <motion.button
      layout
      onClick={(e) => {
        if (multiSelect && onToggleSelection && (e.ctrlKey || e.metaKey || e.shiftKey)) {
          onToggleSelection(e);
        } else {
          onSelect(e);
        }
      }}
      onMouseEnter={onHover}
      className={`
        w-full flex items-center gap-1 px-2 py-1 rounded-md text-left cursor-pointer
        transition-colors duration-75 group relative
        ${isActive ? "text-accent-foreground bg-accent" : "hover:bg-accent hover:text-accent-foreground"}
      `}
    >
      {item.icon && (
        <span
          className={`relative flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-base
          ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : isActive
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {item.icon}
        </span>
      )}

      <div className="relative flex-1 min-w-0 px-1">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-sm font-medium truncate ${isActive ? "text-foreground" : "text-foreground/80"}`}
          >
            <HighlightText text={item.label} query={searchQuery} />
          </span>
          {item.badge && (
            <Badge color={mapBadgeVariantToColor(item.badgeVariant)}>
              {item.badge.toUpperCase()}
            </Badge>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground truncate">
            <HighlightText text={item.description} query={searchQuery} />
          </p>
        )}
      </div>

      {item.shortcut && (
        <div className="relative hidden sm:flex items-center gap-1 flex-shrink-0">
          {item.shortcut.map((k, i) => (
            <Kbd key={i}>{k}</Kbd>
          ))}
        </div>
      )}

      {isSelected && (
        <motion.div
          layoutId={`selected-indicator-${item.id}`}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-primary rounded-r-md"
        />
      )}

      {isActive && !isSelected && (
        <CaretRightIcon
          className="relative w-4 h-4 text-primary flex-shrink-0"
          weight="bold"
        />
      )}
    </motion.button>
  );
}