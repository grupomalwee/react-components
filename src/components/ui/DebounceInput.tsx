import { useEffect, useState } from 'react';
import { InputBase } from './InputBase';

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  rightIcon,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
  rightIcon?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <InputBase
      {...props}
      rightIcon={rightIcon}
      className="w-full text-xs sm:text-sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
