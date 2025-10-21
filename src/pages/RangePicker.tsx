import * as React from "react";
import { RangePicker } from "@/components/date-time-picker/RangePicker";
import { DateRange } from "react-day-picker";

export default function RangePickerPage() {
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <div className="p-8">
      <RangePicker value={range} onChange={setRange} label="Gw tnyrywrbyrywrtttt"/>
    </div>
  );
}
