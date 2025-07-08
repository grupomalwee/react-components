'use client'

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "../..//lib/utils";
import LabelBase, { LabelBaseProps } from "@/components/ui/LabelBase";

// Reexporta diretamente
const FormBase = FormProvider;

type FormFieldBaseContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldBaseContext = React.createContext<FormFieldBaseContextValue>(
  {} as FormFieldBaseContextValue
);

const FormFieldBase = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldBaseContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldBaseContext.Provider>
  );
};

const useFormFieldBase = () => {
  const fieldContext = React.useContext(FormFieldBaseContext);
  const itemContext = React.useContext(FormItemBaseContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormFieldBase should be used within <FormFieldBase>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    FormItemId: `${id}-form-item`,
    FormDescriptionId: `${id}-form-item-description`,
    FormMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemBaseContextValue = {
  id: string;
};

const FormItemBaseContext = React.createContext<FormItemBaseContextValue>(
  {} as FormItemBaseContextValue
);

const FormItemBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemBaseContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemBaseContext.Provider>
  );
});
FormItemBase.displayName = "FormItemBase";

const FormLabelBase = React.forwardRef<HTMLLabelElement, LabelBaseProps>(
  ({ className, ...props }, ref) => {
    const { error, FormItemId } = useFormFieldBase();

    return (
      <LabelBase
        ref={ref}
        className={cn(error && "text-destructive", className)}
        htmlFor={FormItemId}
        {...props}
      />
    );
  }
);
FormLabelBase.displayName = "FormLabelBase";

const FormControlBase = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, FormItemId, FormDescriptionId, FormMessageId } =
    useFormFieldBase();

  return (
    <Slot
      ref={ref}
      id={FormItemId}
      aria-describedby={
        !error
          ? `${FormDescriptionId}`
          : `${FormDescriptionId} ${FormMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControlBase.displayName = "FormControlBase";

const FormDescriptionBase = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { FormDescriptionId } = useFormFieldBase();

  return (
    <p
      ref={ref}
      id={FormDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescriptionBase.displayName = "FormDescriptionBase";

const FormMessageBase = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, FormMessageId } = useFormFieldBase();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={FormMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessageBase.displayName = "FormMessageBase";

export {
  useFormFieldBase,
  FormBase,
  FormItemBase,
  FormLabelBase,
  FormControlBase,
  FormDescriptionBase,
  FormMessageBase,
  FormFieldBase,
};
