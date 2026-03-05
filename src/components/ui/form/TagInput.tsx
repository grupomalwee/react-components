"use client";

import * as React from "react";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";
import LabelBase from "./LabelBase";
import { ErrorMessage } from "../shared/ErrorMessage";

export interface TagInputProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> {
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  maxTags?: number;
  allowDuplicates?: boolean;
  separators?: string[];
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  "data-testid"?: string;
}

interface TagChipProps {
  label: string;
  onRemove: () => void;
  disabled?: boolean;
  testid?: string;
}

const TagChip: React.FC<TagChipProps> = ({
  label,
  onRemove,
  disabled,
  testid,
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
      "bg-primary/10 text-primary border border-primary/20",
      "transition-colors",
    )}
    data-testid={testid}
  >
    {label}
    {!disabled && (
      <button
        type="button"
        onClick={onRemove}
        data-testid={`${testid}-remove`}
        aria-label={`Remover ${label}`}
        className={cn(
          "inline-flex items-center justify-center rounded-full size-3.5",
          "hover:bg-primary/20 text-primary/70 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
          "transition-colors",
        )}
      >
        <XIcon weight="bold" className="size-2.5" />
      </button>
    )}
  </span>
);

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      tags = [],
      onTagsChange,
      maxTags,
      allowDuplicates = false,
      separators = [","],
      label,
      error,
      disabled = false,
      placeholder = "Digite e pressione Enter...",
      className,
      "data-testid": dataTestId = "tag-input",
      onKeyDown,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const isMaxReached = maxTags !== undefined && tags.length >= maxTags;

    const addTag = (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (!allowDuplicates && tags.includes(trimmed)) {
        setInputValue("");
        return;
      }
      if (isMaxReached) return;
      onTagsChange?.([...tags, trimmed]);
      setInputValue("");
    };

    const removeTag = (index: number) => {
      onTagsChange?.(tags.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);

      if (e.key === "Enter") {
        e.preventDefault();
        addTag(inputValue);
        return;
      }

      if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
        removeTag(tags.length - 1);
        return;
      }

      if (separators.includes(e.key)) {
        e.preventDefault();
        addTag(inputValue);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const hasSeparator = separators.some((sep) => val.includes(sep));
      if (hasSeparator) {
        const parts = val.split(new RegExp(`[${separators.join("")}]`));
        parts.slice(0, -1).forEach((part) => addTag(part));
        setInputValue(parts[parts.length - 1]);
      } else {
        setInputValue(val);
      }
    };

    return (
      <div
        className={cn("flex flex-col w-full min-w-[150px]")}
        data-testid={dataTestId}
      >
        {label && <LabelBase className="mb-1">{label}</LabelBase>}

        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5 min-h-9 rounded-md border bg-background px-2 py-1.5 transition",
            error
              ? "border-destructive focus-within:ring-1 focus-within:ring-destructive"
              : "border-input focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring",
            disabled && "opacity-50 pointer-events-none",
            className,
          )}
        >
          {tags.map((tag, i) => (
            <TagChip
              key={`${tag}-${i}`}
              label={tag}
              disabled={disabled}
              onRemove={() => removeTag(i)}
              testid={`${dataTestId}-tag-${i}`}
            />
          ))}

          {!isMaxReached && (
            <input
              ref={ref}
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={tags.length === 0 ? placeholder : ""}
              data-testid={`${dataTestId}-input`}
              className={cn(
                "flex-1 min-w-[120px] bg-transparent text-sm text-foreground",
                "placeholder:text-muted-foreground focus:outline-none",
                "disabled:cursor-not-allowed",
              )}
              {...props}
            />
          )}

          {isMaxReached && tags.length > 0 && (
            <span className="text-xs text-muted-foreground ml-1">
              Máx. {maxTags} tags
            </span>
          )}
        </div>

        <ErrorMessage error={error} />
      </div>
    );
  },
);

TagInput.displayName = "TagInput";

export { TagInput };
