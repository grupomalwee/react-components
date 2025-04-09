interface TimePickerProps {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    hideSeconds?: boolean;
}
export declare function TimePicker({ date, setDate, hideSeconds }: TimePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
