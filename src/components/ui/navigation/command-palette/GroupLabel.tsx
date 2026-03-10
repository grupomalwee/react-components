import { CommandGroup } from "./types";

export function GroupLabel({ group }: { group: CommandGroup }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 mb-1">
      {group.icon && (
        <span className="text-muted-foreground w-3.5 h-3.5">{group.icon}</span>
      )}
      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
        {group.label}
      </span>
    </div>
  );
}
