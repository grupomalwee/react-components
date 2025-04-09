import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
declare const AlertDialogBase: React.FC<AlertDialogPrimitive.AlertDialogProps>;
declare const AlertDialogTriggerBase: React.ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogPortalBase: React.FC<AlertDialogPrimitive.AlertDialogPortalProps>;
declare const AlertDialogOverlayBase: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AlertDialogContentBase: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const AlertDialogHeaderBase: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const AlertDialogFooterBase: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const AlertDialogTitleBase: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const AlertDialogDescriptionBase: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDialogActionBase: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const AlertDialogCancelBase: React.ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { AlertDialogBase, AlertDialogPortalBase, AlertDialogOverlayBase, AlertDialogTriggerBase, AlertDialogContentBase, AlertDialogHeaderBase, AlertDialogFooterBase, AlertDialogTitleBase, AlertDialogDescriptionBase, AlertDialogActionBase, AlertDialogCancelBase, };
