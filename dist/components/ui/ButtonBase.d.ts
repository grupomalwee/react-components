import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariantsBase: (props?: (Partial<{
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
    size: "default" | "sm" | "lg" | "icon";
}> & {
    className?: string;
}) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariantsBase> {
    asChild?: boolean;
}
declare const ButtonBase: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { ButtonBase, buttonVariantsBase };
