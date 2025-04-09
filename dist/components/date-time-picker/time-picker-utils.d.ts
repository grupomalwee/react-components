/**
 * regular expression to check for valid hour format (01-23)
 */
export declare function isValidHour(value: string): boolean;
/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export declare function isValid12Hour(value: string): boolean;
/**
 * regular expression to check for valid minute format (00-59)
 */
export declare function isValidMinuteOrSecond(value: string): boolean;
type GetValidNumberConfig = {
    max: number;
    min?: number;
    loop?: boolean;
};
export declare function getValidNumber(value: string, { max, min, loop }: GetValidNumberConfig): string;
export declare function getValidHour(value: string): string;
export declare function getValid12Hour(value: string): string;
export declare function getValidMinuteOrSecond(value: string): string;
type GetValidArrowNumberConfig = {
    min: number;
    max: number;
    step: number;
};
export declare function getValidArrowNumber(value: string, { min, max, step }: GetValidArrowNumberConfig): string;
export declare function getValidArrowHour(value: string, step: number): string;
export declare function getValidArrow12Hour(value: string, step: number): string;
export declare function getValidArrowMinuteOrSecond(value: string, step: number): string;
export declare function setMinutes(date: Date, value: string): Date;
export declare function setSeconds(date: Date, value: string): Date;
export declare function setHours(date: Date, value: string): Date;
export declare function set12Hours(date: Date, value: string, period: Period): Date;
export type TimePickerType = "minutes" | "seconds" | "hours" | "12hours";
export type Period = "AM" | "PM";
export declare function setDateByType(date: Date, value: string, type: TimePickerType, period?: Period): Date;
export declare function getDateByType(date: Date, type: TimePickerType): string;
export declare function getArrowByType(value: string, step: number, type: TimePickerType): string;
/**
 * handles value change of 12-hour input
 * 12:00 PM is 12:00
 * 12:00 AM is 00:00
 */
export declare function convert12HourTo24Hour(hour: number, period: Period): number;
/**
 * time is stored in the 24-hour form,
 * but needs to be displayed to the user
 * in its 12-hour representation
 */
export declare function display12HourValue(hours: number): string;
export {};
