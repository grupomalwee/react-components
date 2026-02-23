// "use client";
// import { motion } from "framer-motion";
// import NumberFlow, { useCanAnimate } from "@number-flow/react";
// import { cn } from "@/lib/utils";
// import { ArrowUpIcon } from "@phosphor-icons/react";

// const MotionNumberFlow = motion(NumberFlow);
// const MotionArrowUp = motion(ArrowUpIcon);

// interface PriceProps {
//   value: number;
//   diff?: number;
//   className?: string;
//   valueClassName?: string;
//   diffClassName?: string;
//   valueFormat?: Intl.NumberFormatOptions;
//   diffFormat?: Intl.NumberFormatOptions;
//   textClassName?: string;
//   currency?: string;
//   locale?: string;
//   size?: "sm" | "md" | "lg" | "xl";
//   label?: string;
//   showDiff?: boolean;
//   trendColors?: {
//     positive?: string;
//     negative?: string;
//     neutral?: string;
//   };
// }

// const sizeClasses = {
//   sm: {
//     value: "text-2xl",
//     diff: "px-[0.4em] py-0.5 text-xs",
//     label: "text-xs",
//   },
//   md: {
//     value: "text-3xl",
//     diff: "px-[0.45em] py-0.5 text-sm",
//     label: "text-sm",
//   },
//   lg: {
//     value: "text-4xl",
//     diff: "px-[0.5em] py-0.5 text-base",
//     label: "text-base",
//   },
//   xl: {
//     value: "text-5xl",
//     diff: "px-[0.5em] py-0.5 text-lg",
//     label: "text-lg",
//   },
// };

// export function Price({
//   value,
//   diff = 0,
//   className,
//   valueClassName,
//   diffClassName,
//   valueFormat,
//   diffFormat,
//   textClassName,
//   currency = "BRL",
//   locale = "pt-BR",
//   size = "xl",
//   label,
//   showDiff = true,
//   trendColors = {
//     positive: "bg-emerald-400",
//     negative: "bg-red-500",
//     neutral: "bg-gray-400",
//   },
// }: PriceProps) {
//   const canAnimate = useCanAnimate();
//   const sizes = sizeClasses[size];

//   const diffColor =
//     diff > 0
//       ? trendColors.positive
//       : diff < 0
//         ? trendColors.negative
//         : trendColors.neutral;

//   return (
//     <div className={cn("flex flex-col gap-1", className)}>
//       {label && (
//         <span className={cn("text-muted-foreground", sizes.label)}>
//           {label}
//         </span>
//       )}
//       <div className={cn("flex items-center gap-2", textClassName)}>
//         <NumberFlow
//           value={value}
//           locales={locale}
//           className={cn("font-semibold", sizes.value, valueClassName)}
//           format={valueFormat ?? { style: "currency", currency }}
//         />
//         {showDiff && (
//           <motion.span
//             className={cn(
//               diffColor,
//               "inline-flex items-center text-white transition-colors duration-300 rounded-full",
//               sizes.diff,
//               diffClassName,
//             )}
//             layout={canAnimate}
//             transition={{
//               layout: { duration: 0.9, bounce: 0, type: "spring" },
//             }}
//           >
//             <MotionArrowUp
//               className="mr-0.5 size-[0.75em]"
//               strokeWidth={3}
//               transition={{
//                 rotate: { type: "spring", duration: 0.5, bounce: 0 },
//               }}
//               animate={{ rotate: diff > 0 ? 0 : diff < 0 ? -180 : 90 }}
//               initial={false}
//             />
//             <MotionNumberFlow
//               value={diff}
//               locales={locale}
//               className="font-semibold"
//               format={
//                 diffFormat ?? { style: "percent", maximumFractionDigits: 2 }
//               }
//               layout={canAnimate}
//               layoutRoot={canAnimate}
//             />
//           </motion.span>
//         )}
//       </div>
//     </div>
//   );
// }
