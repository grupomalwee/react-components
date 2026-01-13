import { CaretUpDownIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Badge } from "./data/Badge";
import { ButtonBase } from "./form/ButtonBase";
import { motion } from "framer-motion";

interface LeaderboardItem {
  name: string;
  percentage: number;
}

interface LeaderboardProps {
  items?: LeaderboardItem[];
  order?: "asc" | "desc";
  title?: string;
  className?: string;
}

export function Leaderboard({
  items,
  order: initialOrder = "desc",
  title = "LeaderBoard",
  className,
}: LeaderboardProps) {
  const [order, setOrder] = useState<"asc" | "desc">(initialOrder);
  const mockData = [
    { name: "Ana", percentage: 92 },
    { name: "Bruno", percentage: 81 },
    { name: "Carla", percentage: 74 },
    { name: "Daniel", percentage: 68 },
    { name: "Eduardo", percentage: 55 },
    { name: "Fernanda", percentage: 44 },
    { name: "Gabriela", percentage: 33 },
    { name: "Heitor", percentage: 28 },
    { name: "Isabela", percentage: 22 },
    { name: "João", percentage: 18 },
  ];

  const data = items ?? mockData;
  const sortedData = [...data].sort((a, b) =>
    order === "desc" ? b.percentage - a.percentage : a.percentage - b.percentage
  );

  const getBadgeColor = (pct: number) => {
    if (pct >= 75) return "red";
    if (pct >= 25) return "yellow";
    return "green";
  };

  return (
    <div
      className={`border rounded-xl flex flex-col max-h-80 w-96 ${className}`}
    >
      <div className="flex items-center justify-between p-4 border-b flex-shrink-0 gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ButtonBase
          size="icon"
          variant="outline"
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
        >
          <CaretUpDownIcon />
        </ButtonBase>
      </div>

      <div className="overflow-y-auto flex-1">
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
                    {idx + 1}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </div>
                <Badge
                  color={getBadgeColor(item.percentage)}
                  size="md"
                  className="font-bold"
                >
                  {item.percentage}%
                </Badge>
              </li>
            </motion.span>
          ))}
        </ul>
      </div>
    </div>
  );
}
