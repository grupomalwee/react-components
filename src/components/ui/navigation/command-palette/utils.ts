import { useCallback, useState } from "react";
import { CommandItem, CommandGroup } from "./types";

export function normalizeStr(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function scoreMatch(item: CommandItem, query: string): number {
  const q = normalizeStr(query);
  const label = normalizeStr(item.label);
  const desc = normalizeStr(item.description ?? "");
  const keywords = (item.keywords ?? []).map(normalizeStr);

  if (label === q) return 100;
  if (label.startsWith(q)) return 90;
  if (label.includes(q)) return 70;
  if (desc.includes(q)) return 50;
  if (keywords.some((k) => k.includes(q))) return 40;
  return -1;
}

export function filterAndScore(
  groups: CommandGroup[],
  query: string,
): CommandGroup[] {
  if (!query.trim()) return groups;
  return groups
    .map((g) => ({
      ...g,
      items: g.items
        .map((item) => ({ item, score: scoreMatch(item, query) }))
        .filter(({ score }) => score >= 0)
        .sort((a, b) => b.score - a.score)
        .map(({ item }) => item),
    }))
    .filter((g) => g.items.length > 0)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export function normaliseGroups(
  items: CommandItem[] = [],
  groups: CommandGroup[] = [],
): CommandGroup[] {
  const result: CommandGroup[] = [];
  if (items.length > 0) {
    result.push({ id: "__flat__", label: "", items });
  }
  result.push(...groups);
  return result;
}

export function unionGroups(
  base: CommandGroup[],
  terms: string[],
): CommandGroup[] {
  if (terms.length === 0) return base;

  const allMatchedIds = new Set<string>();
  terms.forEach((term) => {
    const filtered = filterAndScore(base, term);
    filtered.forEach((g) => g.items.forEach((i) => allMatchedIds.add(i.id)));
  });

  return base
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => allMatchedIds.has(item.id)),
    }))
    .filter((group) => group.items.length > 0);
}

export function createGroup(
  id: string,
  label: string,
  items: CommandItem[],
  opts?: { icon?: React.ReactNode; priority?: number },
): CommandGroup {
  return { id, label, items, ...opts };
}

export function createItem(item: CommandItem): CommandItem {
  return item;
}

const STORAGE_KEY = "cmd:recents";
const MAX_RECENTS = 5;

function readStorage(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeStorage(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    console.error("Failed to write to localStorage");
  }
}

export function useRecents(allItems: CommandItem[]) {
  const [recentIds, setRecentIds] = useState<string[]>(readStorage);

  const push = useCallback((item: CommandItem) => {
    setRecentIds((prev) => {
      const next = [item.id, ...prev.filter((id) => id !== item.id)].slice(
        0,
        MAX_RECENTS,
      );
      writeStorage(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setRecentIds([]);
    writeStorage([]);
  }, []);

  const items = recentIds
    .map((id) => allItems.find((i) => i.id === id))
    .filter(Boolean) as CommandItem[];

  return { items, push, clear };
}
