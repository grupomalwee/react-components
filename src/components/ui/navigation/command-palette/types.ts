import * as React from "react";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  badge?: string;
  badgeVariant?:
    | "default"
    | "success"
    | "warning"
    | "danger"
    | "primary"
    | "secondary"
    | "destructive"
    | "muted";
  onSelect: () => void;
  keywords?: string[];
}

export interface CommandGroup {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items: CommandItem[];
  priority?: number;
}

export interface CommandPaletteProps {
  items?: CommandItem[];
  groups?: CommandGroup[];
  placeholder?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recentItems?: CommandItem[];
  onRecentItemsChange?: (items: CommandItem[]) => void;
  emptyMessage?: string;
  shortcut?: {
    key: string;
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
  };
  maxRecentItems?: number;
  multiSearch?: boolean;
  debounceDelay?: number;
  footer?: React.ReactNode;
  onSelect?: (item: CommandItem) => void;
  className?: string;
}
