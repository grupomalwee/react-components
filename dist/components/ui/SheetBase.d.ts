import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { type VariantProps } from "class-variance-authority";
declare const SheetBase: React.FC<SheetPrimitive.DialogProps>;
declare const SheetTriggerBase: React.ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetCloseBase: React.ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortalBase: React.FC<SheetPrimitive.DialogPortalProps>;
declare const SheetOverlayBase: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const sheetVariants: (props?: (Partial<{
    side: "top" | "right" | "bottom" | "left";
}> & {
    className?: string;
}) | undefined) => string;
interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare const SheetContentBase: React.ForwardRefExoticComponent<SheetContentProps & React.RefAttributes<HTMLDivElement>>;
declare const SheetHeaderBase: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetFooterBase: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetTitleBase: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const SheetDescriptionBase: React.ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { SheetBase, SheetPortalBase, SheetOverlayBase, SheetTriggerBase, SheetCloseBase, SheetContentBase, SheetHeaderBase, SheetFooterBase, SheetTitleBase, SheetDescriptionBase, };
