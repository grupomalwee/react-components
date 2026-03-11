import { motion } from "framer-motion";
import { CaretRightIcon } from "@phosphor-icons/react";
import { CommandItem } from "./types";
import { Kbd } from "./Kbd";
import { Badge, type BadgeColorType } from "../../data/Badge";

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
  onSelect: () => void;
  onHover: () => void;
}

export function CommandItemRow({
  item,
  isActive,
  onSelect,
  onHover,
}: CommandItemRowProps) {
  return (
    <motion.button
      layout
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`
        w-full flex items-center gap-1 px-2  py-1 rounded-md text-left cursor-pointer
        transition-colors duration-75 group relative
        ${isActive ? "text-accent-foreground hover:bg-accent" : "hover:bg-accent hover:text-accent-foreground"}
      `}
    >
      {item.icon && (
        <span
          className={`relative flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-base
          ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"}`}
        >
          {item.icon}
        </span>
      )}

      <div className="relative flex-1 min-w-0 px-1">
        <div className="flex items-center gap-3  flex-wrap">
          <span
            className={`text-sm font-medium truncate ${isActive ? "text-foreground" : "text-foreground/80"}`}
          >
            {item.label}
          </span>
          {item.badge && (
            <Badge color={mapBadgeVariantToColor(item.badgeVariant)}>
              {item.badge.toUpperCase()}
            </Badge>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground truncate">
            {item.description}
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

      {isActive && (
        <CaretRightIcon
          className="relative w-4 h-4 text-primary flex-shrink-0"
          weight="bold"
        />
      )}
    </motion.button>
  );
}
