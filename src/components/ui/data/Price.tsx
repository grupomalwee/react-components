// "use client";
// import { motion } from "framer-motion";
// import NumberFlow, { useCanAnimate } from "@number-flow/react";
// import { cn } from "@/lib/utils";
// import { ArrowUpIcon } from "@phosphor-icons/react";

// const MotionNumberFlow = motion(NumberFlow);
// const MotionArrowUp = motion(ArrowUpIcon);

// interface PriceProps {
//   value: number;
//   diff: number;
//   className?: string;
//   valueClassName?: string;
//   diffClassName?: string;    
//   valueFormat?: Intl.NumberFormatOptions;
//   diffFormat?: Intl.NumberFormatOptions;
//   textClassName?: string;
// }

// export function Price({
//   value,  
//   diff,
//   className,
//   valueClassName,
//   diffClassName,
//   valueFormat,
//   diffFormat,
//   textClassName,
// }: PriceProps) {
//   const canAnimate = useCanAnimate();

//   return (
//     <>
//       <span className={cn("flex items-center justify-center gap-2", className, textClassName)}>
//         <NumberFlow
//           value={value}
//           className={cn("text-5xl font-semibold", valueClassName)}
//           format={valueFormat ?? { style: "currency", currency: "BRL" }}
//         />
//         <motion.span
//           className={cn(
//             diff > 0 ? "bg-emerald-400" : "bg-red-500",
//             "inline-flex items-center px-[0.5em] text-white transition-colors duration-300 rounded-full py-0.5",
//             diffClassName
//           )}  
//           layout={canAnimate}
//           transition={{ layout: { duration: 0.9, bounce: 0, type: "spring" } }}
//         >
//           <MotionArrowUp
//             className="mr-0.5 size-[0.75em]"
//             strokeWidth={3}
//             transition={{
//               rotate: { type: "spring", duration: 0.5, bounce: 0 },
//             }}
//             animate={{ rotate: diff > 0 ? 0 : -180 }}
//             initial={false}
//           />
//           <MotionNumberFlow
//             value={diff}
//             className="font-semibold"
//             format={diffFormat ?? { style: "percent", maximumFractionDigits: 2 }}
//             layout={canAnimate}
//             layoutRoot={canAnimate}
//           />
//         </motion.span>
//       </span>
//     </>
//   );
// }
