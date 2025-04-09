import * as React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
declare const FormBase: <TFieldValues extends FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>(props: import("react-hook-form").FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
declare const FormFieldBase: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
declare const useFormFieldBase: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: string;
    name: string;
    FormItemId: string;
    FormDescriptionId: string;
    FormMessageId: string;
};
declare const FormItemBase: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FormLabelBase: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & {
    asChild?: boolean;
} & React.RefAttributes<HTMLLabelElement>>;
declare const FormControlBase: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-slot").SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const FormDescriptionBase: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessageBase: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export { useFormFieldBase, FormBase, FormItemBase, FormLabelBase, FormControlBase, FormDescriptionBase, FormMessageBase, FormFieldBase, };
