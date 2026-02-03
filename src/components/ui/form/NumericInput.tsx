import { CheckIcon, PencilSimpleIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { InputBase } from './InputBase';
import LabelBase from './LabelBase';
import { ButtonBase } from './ButtonBase';

type PlanInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
  error?: string;
  isLoading?: boolean;
  disabled?: boolean;
  tooltip_on_overflow?: boolean;
  hideConfirm?: boolean;
};

export function NumericInput({
  value,
  onChange,
  min,
  max,
  label,
  className,
  error,
  isLoading,
  disabled,
  tooltip_on_overflow,
  hideConfirm = false,
}: PlanInputProps) {
  const original = useMemo(() => value, [value]);
  const [internalValue, setInternalValue] = useState(original);

  const hasChanged = internalValue !== original;

  const handleSave = () => {
    if (!hasChanged || isLoading || disabled) return;
    onChange(internalValue);
  };

  function handleNumberChange(
    value: string,
    currentValue = 0,
    max = 9_999_999,
    min = 0
  ): number {
    const numbersOnly = value.replace(/\D/g, '');

    if (numbersOnly === '') {
      return 0;
    }

    const numValue = Number(numbersOnly);

    if (numValue < min) {
      if (tooltip_on_overflow) {
        toast.warning('O valor deve ser maior que ' + min.toString());
      }
      return min;
    }

    if (numValue > max) {
      if (tooltip_on_overflow) {
        toast.warning('O valor deve ser menor que ' + max.toString());
      }
      return currentValue;
    }

    return numValue;
  }

  function blurOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  }

  return (
    <div className={`${className} flex flex-col`}>
      {label && <LabelBase>{label}</LabelBase>}
      <div className="flex items-start gap-2">
        <InputBase
          value={internalValue}
          onChange={(e) => {
            const processedValue = handleNumberChange(
              e.currentTarget.value,
              internalValue,
              max,
              min
            );
            setInternalValue(processedValue);
          }}
          onBlur={handleSave}
          onKeyDown={blurOnEnter}
          rightIcon={<PencilSimpleIcon size={12} className="mr-2" />}
          error={error}
          disabled={disabled}
        />

        <AnimatePresence>
          {hasChanged && !hideConfirm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <ButtonBase
                className=" h-9 w-9 bg-green-600 text-white hover:bg-green-700 rounded-md flex items-center justify-center"
                size="icon"
                isLoading={isLoading}
              >
                <CheckIcon size={14} />
              </ButtonBase>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
