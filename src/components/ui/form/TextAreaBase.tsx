import * as React from "react";
import { motion } from "framer-motion";
import { TrashIcon } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";
import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "../feedback/TooltipBase";

export interface TextAreaBaseProps extends React.ComponentProps<"textarea"> {
  clearable?: boolean;
  onClear?: () => void;
}

const TextAreaBase = React.forwardRef<HTMLTextAreaElement, TextAreaBaseProps>(
  ({ className, clearable = false, onClear, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasContent, setHasContent] = React.useState(
      !!props.value || !!props.defaultValue
    );
    const [showConfirmTooltip, setShowConfirmTooltip] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasContent(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const handleClearClick = () => {
      setShowConfirmTooltip(true);
    };

    const handleConfirmClear = () => {
      if (textareaRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          "value"
        )?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(textareaRef.current, "");
          const event = new Event("input", { bubbles: true });
          textareaRef.current.dispatchEvent(event);
        }

        setHasContent(false);
        setShowConfirmTooltip(false);
        textareaRef.current.focus();

        // Chama o callback onClear se fornecido
        onClear?.();
      }
    };

    const handleCancelClear = () => {
      setShowConfirmTooltip(false);
    };

    React.useImperativeHandle(ref, () => textareaRef.current!);

    React.useEffect(() => {
      setHasContent(!!props.value || !!props.defaultValue);
    }, [props.value, props.defaultValue]);

    return (
      <div className="relative">
        <textarea
          className={cn(
            "peer flex min-h-[80px] min-w-[200px] w-full rounded-lg border border-input bg-background/50 backdrop-blur-sm",
            "px-4 py-3 text-base shadow-sm placeholder:text-muted-foreground/60",
            "transition-all duration-300 ease-out",
            "hover:border-input/80 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-ring",
            "focus-visible:shadow-lg focus-visible:bg-background",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30",
            "resize",
            "md:text-sm",
            clearable && hasContent && "pr-10",
            className
          )}
          ref={textareaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {clearable && hasContent && (
          <TooltipProviderBase>
            <TooltipBase
              open={showConfirmTooltip}
              onOpenChange={setShowConfirmTooltip}
            >
              <TooltipTriggerBase asChild>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleClearClick}
                  className={cn(
                    "absolute top-3 right-3 p-1.5 rounded-md",
                    "text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10",
                    "transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-destructive/30",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                  disabled={props.disabled}
                  aria-label="Limpar texto"
                >
                  <TrashIcon size={16} weight="regular" />
                </motion.button>
              </TooltipTriggerBase>
              <TooltipContentBase
                side="left"
                className="bg-background border border-border shadow-lg p-3 flex flex-col gap-2"
              >
                <p className="text-sm text-foreground font-medium mb-1">
                  Limpar todo o texto?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmClear}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-md font-medium",
                      "bg-destructive text-destructive-foreground",
                      "hover:bg-destructive/90",
                      "transition-colors"
                    )}
                  >
                    Confirmar
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClear}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-md font-medium",
                      "bg-secondary text-secondary-foreground",
                      "hover:bg-secondary/80",
                      "transition-colors"
                    )}
                  >
                    Cancelar
                  </button>
                </div>
              </TooltipContentBase>
            </TooltipBase>
          </TooltipProviderBase>
        )}

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-ring/20 via-ring/10 to-ring/20 blur-sm" />
        </motion.div>

        {isFocused && hasContent && props.maxLength && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-2 right-3 text-xs text-muted-foreground/70 font-medium"
          >
            {(props.value as string)?.length || 0} / {props.maxLength}
          </motion.div>
        )}
      </div>
    );
  }
);
TextAreaBase.displayName = "TextAreaBase";

export { TextAreaBase };
