"use client";

import React from "react";
import { DateTimePicker } from "@/components/ui/picker/DateTimePicker";
import {
  ComboboxBase,
  ComboboxItem,
} from "@/components/ui/selects/ComboboxBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import {
  DialogBase,
  DialogTriggerBase,
  DialogContentBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogDescriptionBase,
} from "@/components/ui/feedback/DialogBase";
import { MultiCombobox } from "@/components/ui/selects/MultiCombobox";

export default function DatePickerPage() {
  const [date1, setDate1] = React.useState<Date | null>(new Date());
  const [date2, setDate2] = React.useState<Date | null>(new Date());
  const items: ComboboxItem<string>[] = Array.from({ length: 80 }, (_, i) => {
    const n = i + 1;
    return { value: `item-${n}`, label: `Item ${n}` };
  });

  const [selected, setSelected] = React.useState<string | null>(items[0].value);
  const [multiSelected, setMultiSelected] = React.useState<string[]>(
    selected ? [selected] : []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <DateTimePicker
          label="Campo desabilitado"
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

      <DialogBase>
        <DialogTriggerBase asChild>
          <ButtonBase variant="outline">Abrir dialog</ButtonBase>
        </DialogTriggerBase>
        <DialogContentBase className="sm:max-w-md h-[50vh] overflow-y-auto">
          <DialogHeaderBase>
            <DialogTitleBase>Combobox dentro do Dialog</DialogTitleBase>
            <DialogDescriptionBase>
              Abra o combobox e use a rolagem (mouse wheel ou mouse3).
            </DialogDescriptionBase>
          </DialogHeaderBase>

          <div className="mt-4" style={{ width: 360 }}>
            <ComboboxBase
              items={items}
              renderSelected={
                <span>{items.find((i) => i.value === selected)?.label}</span>
              }
              handleSelection={(value) => {
                setSelected(value);
                setMultiSelected(value ? [value] : []);
              }}
              checkIsSelected={(value) => selected === value}
            />
            <MultiCombobox
              items={items}
              selected={multiSelected}
              onChange={setMultiSelected}
              label="Frutas (disabled)"
              placeholder="Não é possível alterar"
              
            />
            <ComboboxBase
              items={items}
              renderSelected={
                <span>{items.find((i) => i.value === selected)?.label}</span>
              }
              handleSelection={(value) => {
                setSelected(value);
                setMultiSelected(value ? [value] : []);
              }}
              checkIsSelected={(value) => selected === value}
            />
            <MultiCombobox
              items={items}
              selected={multiSelected}
              onChange={setMultiSelected}
              label="Frutas (disabled)"
              placeholder="Não é possível alterar"
              
            />
            <ComboboxBase
              items={items}
              renderSelected={
                <span>{items.find((i) => i.value === selected)?.label}</span>
              }
              handleSelection={(value) => {
                setSelected(value);
                setMultiSelected(value ? [value] : []);
              }}
              checkIsSelected={(value) => selected === value}
            />
            <MultiCombobox
              items={items}
              selected={multiSelected}
              onChange={setMultiSelected}
              label="Frutas (disabled)"
              placeholder="Não é possível alterar"
              
            />
          </div>
        </DialogContentBase>
      </DialogBase>
    </div>
  );
}
