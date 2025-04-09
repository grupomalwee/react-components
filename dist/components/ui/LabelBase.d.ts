import * as React from "react";
export type LabelBaseProps = React.ComponentPropsWithoutRef<"label"> & {
    asChild?: boolean;
};
declare const LabelBase: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, "ref"> & {
    asChild?: boolean;
} & React.RefAttributes<HTMLLabelElement>>;
export default LabelBase;
