"use client";

import React from "react";
import { DateTimePicker } from "@/components/ui/picker/DateTimePicker";

export default function DatePickerPage() {
  const [date1, setDate1] = React.useState<Date | null>(new Date());
  const [date2, setDate2] = React.useState<Date | null>(new Date());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "240px" }}>
      <div>
        <DateTimePicker
          label="Campo desabilitado"
          disabled={true}
          date={date1}
          onChange={setDate1}
        />
      </div>
      <div>
        <DateTimePicker
          label="Próximos 30 dias"
          fromDate={new Date()}
          toDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          date={date2}
          onChange={setDate2}
        />
      </div>
    </div>
  );
}
