import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";
import { TimePickerInput } from "./TimePickerInput";

interface TimePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  hideSeconds?: boolean;
  enableButton?: boolean;
}

export function TimePicker({
  date,
  setDate,
  hideSeconds,
  enableButton,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-end justify-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 rounded-lg bg-muted/20 border border-border/50 w-full max-w-full overflow-hidden"
    >
      <motion.div
        variants={itemVariants}
        className="grid gap-1 sm:gap-2 text-center flex-shrink-0 min-w-0"
      >
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          enableButton={enableButton}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid gap-1 sm:gap-2 text-center flex-shrink-0 min-w-0"
      >
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          enableButton={enableButton}
        />
      </motion.div>

      <AnimatePresence>
        {!hideSeconds && (
          <>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid gap-1 sm:gap-2 text-center flex-shrink-0 min-w-0"
            >
              <TimePickerInput
                picker="seconds"
                date={date}
                setDate={setDate}
                ref={secondRef}
                onLeftFocus={() => minuteRef.current?.focus()}
                enableButton={enableButton}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
