import { CaretUpDownIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Badge } from "./data/Badge";
import { ButtonBase } from "./form/ButtonBase";
import { motion } from "framer-motion";
import { SkeletonBase } from "./feedback/SkeletonBase";
import { InputBase } from "./form";

export interface LeaderboardItem<T extends string> {
  name: string;
  value: number | string | T;
}

export interface LeaderboardProps<T extends string> {
  items?: LeaderboardItem<T>[];
  order?: "asc" | "desc";
  title?: string;
  className?: string;
  isLoading?: boolean;
  legend?: string[];
  best?: boolean;
  worst?: boolean;
}

export function Leaderboard<T extends string>({
  items,
  order: initialOrder = "desc",
  title = "LeaderBoard",
  className,
  isLoading = false,
  legend,
  best = false,
  worst = false,
}: LeaderboardProps<T>) {
  const [order, setOrder] = useState<"asc" | "desc">(initialOrder);
  const [searchTerm, setSearchTerm] = useState("");
  const mockData = [
    { name: "Ana", value: 92 },
    { name: "Bruno", value: 81 },
    { name: "Carla", value: 74 },
    { name: "Daniel", value: 68 },
    { name: "Eduardo", value: 55 },
    { name: "Fernanda", value: 44 },
    { name: "Gabriela", value: 33 },
    { name: "Heitor", value: 28 },
    { name: "Isabela", value: 22 },
    { name: "João", value: 18 },
  ];

  const data = items ?? mockData;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue =
      typeof a.value === "string" ? parseFloat(a.value) || a.value : a.value;
    const bValue =
      typeof b.value === "string" ? parseFloat(b.value) || b.value : b.value;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "desc" ? bValue - aValue : aValue - bValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "desc"
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    if (typeof aValue === "number") return order === "desc" ? -1 : 1;
    return order === "desc" ? 1 : -1;
  });

  const getBadgeColor = (
    value: number | string,
    index: number,
    total: number,
  ) => {
    if (best || worst) {
      const third = total / 3;
      if (best) {
        if (index < third) return "green";
        if (index < 2 * third) return "yellow";
        return "red";
      }
      if (worst) {
        if (index < third) return "red";
        if (index < 2 * third) return "yellow";
        return "green";
      }
    }

    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "green";
    if (numValue >= 75) return "red";
    if (numValue >= 25) return "yellow";
    return "green";
  };

  return (
    <div
      className={`border rounded-xl flex flex-col max-h-80 w-96  ${className}`}
    >
      <div className="flex items-center justify-between py-2 px-4 border-b flex-shrink-0 gap-3 ">
        <h2 className="text-lg font-semibold px-1 whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-1 max-w-[200px]">
          <InputBase
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar..."
            leftIcon={<MagnifyingGlassIcon size={16} />}
            className="h-8 py-1"
          />
        </div>
        <ButtonBase
          size="icon"
          variant="outline"
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          disabled={isLoading || sortedData.length === 0}
        >
          <motion.div
            animate={{ rotate: order === "asc" ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CaretUpDownIcon />
          </motion.div>
        </ButtonBase>
      </div>

      <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 transition-colors">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-1">
                <div className="flex items-center gap-3 flex-1">
                  <SkeletonBase className="w-8 h-8 rounded-full" />
                  <SkeletonBase className="h-4 w-36 rounded-full" />
                </div>
                <SkeletonBase className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </div>
        ) : sortedData.length === 0 ? (
          <div className="flex items-center justify-center h-full py-12">
            <p className="text-muted-foreground text-sm">
              Sem dados disponíveis
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between py-2.5 px-4 border-b flex-shrink-0 gap-3 sticky top-0 bg-background">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider pl-1">
                {legend?.[0]}
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {legend?.[1]}
              </div>
            </div>
            <ul>
              {sortedData.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.005 }}
                >
                  <li className="flex items-center justify-between py-3 border-b last:border-b-0 hover:bg-muted transition-colors px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400 w-6 h-6 border rounded-full text-center bg-muted/50">
                        {order === "desc" ? idx + 1 : sortedData.length - idx}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <Badge
                      color={getBadgeColor(item.value, idx, sortedData.length)}
                      size="md"
                      className="font-bold"
                    >
                      {item.value}
                    </Badge>
                  </li>
                </motion.span>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
