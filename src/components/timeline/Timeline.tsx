import React from "react";
import { motion, Variants } from "framer-motion";
import CountUp from "./CountUp";

export type TimelineItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  date?: string;
  dateColor?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function formatDate(dateStr?: string) {
  if (!dateStr) return { day: null, month: null, fullDate: null };
  const date = new Date(dateStr);
  if (isNaN(date.getTime()))
    return { day: null, month: null, fullDate: dateStr };

  return {
    day: date.getDate().toString(),
    month: monthNames[date.getMonth()],
    fullDate: date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className = "",
}) => {
  if (!items || items.length === 0) return null;

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.05,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const dotVariants: Variants = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // generate a pastel color from a string (hash -> hue)
  const generatePastelColor = (key: string) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // convert to 32bit integer
    }
    const hue = Math.abs(hash) % 360;
    const saturation = 60; // lower saturation for pastel
    const lightness = 85; // high lightness for pastel
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  };

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <motion.div
        className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-foreground origin-top"
        variants={lineVariants}
        initial="hidden"
        animate="show"
        aria-hidden
      />

      <motion.ol variants={containerVariants} initial="hidden" animate="show">
        {items.map((item) => {
          const { day, month, fullDate } = formatDate(item.date);

          return (
            <motion.li
              key={item.id}
              variants={itemVariants}
              className="relative md:grid md:grid-cols-[120px_1fr] md:gap-8 mb-10"
            >
              <div className="hidden md:flex flex-col items-end text-right pr-4">
                {day && month && (
                  <>
                    {(() => {
                      // prefer item.dateColor if provided, otherwise generate one from date or id
                      const key = item.date ?? String(item.id ?? '');
                      const thisColor = item.dateColor ?? generatePastelColor(key);
                      const useClass = !!(
                        item.dateColor && (item.dateColor.startsWith('bg-') || item.dateColor.includes(' '))
                      );

                      if (useClass) {
                        return (
                          <div
                            className={`flex items-center justify-center w-14 h-14 rounded-md border border-input ${thisColor} text-2xl font-bold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                          >
                            {day ? (
                              <CountUp to={parseInt(day, 10)} duration={0.6} className="leading-none" />
                            ) : null}
                          </div>
                        );
                      }

                      // apply generated (or provided) color as inline style to ensure pastel look
                      return (
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-md border border-input text-2xl font-bold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white`}
                          style={{ backgroundColor: thisColor }}
                        >
                          {day ? (
                            <CountUp to={parseInt(day, 10)} duration={0.6} className="leading-none" />
                          ) : null}
                        </div>
                      );
                    })()}
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 px-4">
                      {month}
                    </div>
                  </>
                )}
              </div>

              <div className="absolute left-4 md:left-[116px] top-5">
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-primary"
                  variants={dotVariants}
                />
              </div>

              <div className="relative pl-10 md:pl-0">
                {fullDate && (
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 md:hidden">
                    {fullDate}
                  </time>
                )}

                <motion.div
                  className="group relative rounded-lg border border-input p-4 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.subtitle}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
};

export default Timeline;
