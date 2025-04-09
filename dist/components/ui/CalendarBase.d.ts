import * as React from "react";
import { DayPicker } from "react-day-picker";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
declare function CalendarBase({ className, classNames, showOutsideDays, ...props }: CalendarProps): import("react/jsx-runtime").JSX.Element;
declare namespace CalendarBase {
    var displayName: string;
}
export { CalendarBase };
