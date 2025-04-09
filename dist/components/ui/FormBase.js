import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext, } from "react-hook-form";
import { cn } from "@/lib/utils";
import LabelBase from "@/components/ui/LabelBase";
// Reexporta diretamente
const FormBase = FormProvider;
const FormFieldBaseContext = React.createContext({});
const FormFieldBase = ({ ...props }) => {
    return (_jsx(FormFieldBaseContext.Provider, { value: { name: props.name }, children: _jsx(Controller, { ...props }) }));
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
const FormItemBaseContext = React.createContext({});
const FormItemBase = React.forwardRef(({ className, ...props }, ref) => {
    const id = React.useId();
    return (_jsx(FormItemBaseContext.Provider, { value: { id }, children: _jsx("div", { ref: ref, className: cn("space-y-2", className), ...props }) }));
});
FormItemBase.displayName = "FormItemBase";
const FormLabelBase = React.forwardRef(({ className, ...props }, ref) => {
    const { error, FormItemId } = useFormFieldBase();
    return (_jsx(LabelBase, { ref: ref, className: cn(error && "text-destructive", className), htmlFor: FormItemId, ...props }));
});
FormLabelBase.displayName = "FormLabelBase";
const FormControlBase = React.forwardRef(({ ...props }, ref) => {
    const { error, FormItemId, FormDescriptionId, FormMessageId } = useFormFieldBase();
    return (_jsx(Slot, { ref: ref, id: FormItemId, "aria-describedby": !error
            ? `${FormDescriptionId}`
            : `${FormDescriptionId} ${FormMessageId}`, "aria-invalid": !!error, ...props }));
});
FormControlBase.displayName = "FormControlBase";
const FormDescriptionBase = React.forwardRef(({ className, ...props }, ref) => {
    const { FormDescriptionId } = useFormFieldBase();
    return (_jsx("p", { ref: ref, id: FormDescriptionId, className: cn("text-[0.8rem] text-muted-foreground", className), ...props }));
});
FormDescriptionBase.displayName = "FormDescriptionBase";
const FormMessageBase = React.forwardRef(({ className, children, ...props }, ref) => {
    const { error, FormMessageId } = useFormFieldBase();
    const body = error ? String(error?.message) : children;
    if (!body) {
        return null;
    }
    return (_jsx("p", { ref: ref, id: FormMessageId, className: cn("text-[0.8rem] font-medium text-destructive", className), ...props, children: body }));
});
FormMessageBase.displayName = "FormMessageBase";
export { useFormFieldBase, FormBase, FormItemBase, FormLabelBase, FormControlBase, FormDescriptionBase, FormMessageBase, FormFieldBase, };
