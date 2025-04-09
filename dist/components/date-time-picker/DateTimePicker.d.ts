interface DateTimePickerProps {
    label?: string;
    date: Date | undefined;
    onChange: (date: Date | undefined) => void;
    hideSeconds?: boolean;
    fromDate?: Date;
    toDate?: Date;
    disabled?: boolean;
    dialogTitle?: string;
}
export declare function DateTimePicker({ label, date, onChange, hideSeconds, fromDate, toDate, disabled, dialogTitle, }: DateTimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
