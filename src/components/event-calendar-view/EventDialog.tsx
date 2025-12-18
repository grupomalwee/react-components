"use client";

import { format, isBefore } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { CalendarEvent, EventColor } from "@/components/event-calendar";
import {
  DefaultEndHour,
  DefaultStartHour,
  EndHour,
  StartHour,
} from "@/components/event-calendar/constants";
import { cn } from "@/lib/utils";
import { CalendarBase } from "@/components/picker/calendar";
// Checkbox removed in favor of a toggle ButtonBase for better UX
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, TrashIcon } from "@phosphor-icons/react";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
} from "../ui/feedback/DialogBase";
import LabelBase from "../ui/form/LabelBase";
import { InputBase } from "../ui/form/InputBase";
import { TextAreaBase } from "../ui/form/TextAreaBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "../ui/overlays/PopoverBase";
import { ButtonBase } from "../ui/form/ButtonBase";
import {
  SelectBase,
  SelectContentBase,
  SelectItemBase,
  SelectTriggerBase,
  SelectValueBase,
} from "../ui/SelectBase";

interface EventDialogProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

export function EventDialog({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState(`${DefaultStartHour}:00`);
  const [endTime, setEndTime] = useState(`${DefaultEndHour}:00`);
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [color, setColor] = useState<EventColor>("sky");
  const [error, setError] = useState<string | null>(null);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // Removido log de debug para satisfazer regras de lint
  useEffect(() => {
    // sem logs em produção
  }, [event]);

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
    setStartTime(`${DefaultStartHour}:00`);
    setEndTime(`${DefaultEndHour}:00`);
    setAllDay(false);
    setLocation("");
    setColor("sky");
    setError(null);
  }, []);

  const formatTimeForInput = useCallback((date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = Math.floor(date.getMinutes() / 15) * 15;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");

      const start = new Date(event.start);
      const end = new Date(event.end);

      setStartDate(start);
      setEndDate(end);
      setStartTime(formatTimeForInput(start));
      setEndTime(formatTimeForInput(end));
      setAllDay(event.allDay || false);
      setLocation(event.location || "");
      setColor((event.color as EventColor) || "sky");
      setError(null); // Reset error when opening dialog
    } else {
      resetForm();
    }
  }, [event, formatTimeForInput, resetForm]);

  // Memoriza as opções de horário (recalculado apenas uma vez — limites são constantes)
  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = StartHour; hour <= EndHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const value = `${formattedHour}:${formattedMinute}`;
        // Usa uma data fixa para evitar criação desnecessária de objetos Date
        const date = new Date(2000, 0, 1, hour, minute);
        const label = format(date, "HH:mm", { locale: ptBR });
        options.push({ label, value });
      }
    }
    return options;
  }, []); // computed once — StartHour/EndHour are static constants

  const handleSave = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!allDay) {
      const [startHours = 0, startMinutes = 0] = startTime
        .split(":")
        .map(Number);
      const [endHours = 0, endMinutes = 0] = endTime.split(":").map(Number);

      if (
        startHours < StartHour ||
        startHours > EndHour ||
        endHours < StartHour ||
        endHours > EndHour
      ) {
        setError(
          `O horário selecionado deve estar entre ${StartHour}:00 e ${EndHour}:00`
        );
        return;
      }

      start.setHours(startHours, startMinutes, 0);
      end.setHours(endHours, endMinutes, 0);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    // Valida que a data de término não é anterior à data de início
    if (isBefore(end, start)) {
      setError("A data de término não pode ser anterior à data de início");
      return;
    }

    // Usa título genérico se vazio
    const eventTitle = title.trim() ? title : "(sem título)";

    onSave({
      allDay,
      color,
      description,
      end,
      id: event?.id || "",
      location,
      start,
      title: eventTitle,
    });
  };

  const handleDelete = () => {
    if (event?.id) {
      onDelete(event.id);
    }
  };

  // Updated color options to match types.ts
  const colorOptions: Array<{
    value: EventColor;
    label: string;
    bgClass: string;
    borderClass: string;
  }> = [
    {
      bgClass: "bg-sky-400 data-[state=checked]:bg-sky-400",
      borderClass: "border-sky-400 data-[state=checked]:border-sky-400",
      label: "Azul (céu)",
      value: "sky",
    },
    {
      bgClass: "bg-amber-400 data-[state=checked]:bg-amber-400",
      borderClass: "border-amber-400 data-[state=checked]:border-amber-400",
      label: "Âmbar",
      value: "amber",
    },
    {
      bgClass: "bg-violet-400 data-[state=checked]:bg-violet-400",
      borderClass: "border-violet-400 data-[state=checked]:border-violet-400",
      label: "Violeta",
      value: "violet",
    },
    {
      bgClass: "bg-rose-400 data-[state=checked]:bg-rose-400",
      borderClass: "border-rose-400 data-[state=checked]:border-rose-400",
      label: "Rosa",
      value: "rose",
    },
    {
      bgClass: "bg-emerald-400 data-[state=checked]:bg-emerald-400",
      borderClass: "border-emerald-400 data-[state=checked]:border-emerald-400",
      label: "Verde",
      value: "emerald",
    },
    {
      bgClass: "bg-orange-400 data-[state=checked]:bg-orange-400",
      borderClass: "border-orange-400 data-[state=checked]:border-orange-400",
      label: "Laranja",
      value: "orange",
    },
  ];

  const dialogVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 320, damping: 28 },
    },
    exit: { opacity: 0, y: 8, scale: 0.995, transition: { duration: 0.12 } },
  };

  return (
    <DialogBase onOpenChange={(open) => !open && onClose()} open={isOpen}>
      <DialogContentBase className="sm:max-w-[425px]">
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <DialogHeaderBase>
            <DialogTitleBase>
              {event?.id ? "Editar evento" : "Criar evento"}
            </DialogTitleBase>
            <DialogDescriptionBase className="sr-only">
              {event?.id
                ? "Edite os detalhes deste evento"
                : "Adicione um novo evento ao seu calendário"}
            </DialogDescriptionBase>
          </DialogHeaderBase>
          {error && (
            <div className="rounded-md bg-destructive/15 px-3 py-2 text-destructive text-sm">
              {error}
            </div>
          )}
          <div className="grid gap-4 py-4">
            <div className="*:not-first:mt-1.5">
              <LabelBase
                htmlFor="title"
                className="text-sm font-medium text-foreground"
              >
                Título
              </LabelBase>
              <InputBase
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="*:not-first:mt-1.5">
              <LabelBase
                htmlFor="description"
                className="text-sm font-medium text-foreground"
              >
                Descrição
              </LabelBase>
              <TextAreaBase
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                value={description}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 *:not-first:mt-1.5">
                <LabelBase
                  htmlFor="start-date"
                  className="text-sm font-medium text-foreground"
                >
                  Data de início
                </LabelBase>
                <PopoverBase
                  onOpenChange={setStartDateOpen}
                  open={startDateOpen}
                >
                  <PopoverTriggerBase asChild>
                    <ButtonBase
                      className={cn(
                        "group w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]",
                        !startDate && "text-muted-foreground"
                      )}
                      id="start-date"
                      variant={"outline"}
                    >
                      <span
                        className={cn(
                          "truncate",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        {startDate
                          ? format(startDate, "PPP", { locale: ptBR })
                          : "Escolher data"}
                      </span>
                      <CalendarIcon
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground/80"
                        size={16}
                      />
                    </ButtonBase>
                  </PopoverTriggerBase>
                  <PopoverContentBase align="start" className="w-auto p-2">
                    <CalendarBase
                      defaultMonth={startDate}
                      mode="single"
                      onSelect={(date) => {
                        if (date) {
                          setStartDate(date);
                          // Se a data de término for anterior à nova data de início, atualize para coincidir
                          if (isBefore(endDate, date)) {
                            setEndDate(date);
                          }
                          setError(null);
                          setStartDateOpen(false);
                        }
                      }}
                      selected={startDate}
                    />
                  </PopoverContentBase>
                </PopoverBase>
              </div>

              {!allDay && (
                <div className="min-w-28 *:not-first:mt-1.5">
                  <LabelBase
                    htmlFor="start-time"
                    className="text-sm font-medium text-foreground"
                  >
                    Horário de início
                  </LabelBase>
                  <SelectBase onValueChange={setStartTime} value={startTime}>
                    <SelectTriggerBase id="start-time">
                      <SelectValueBase placeholder="Selecionar horário" />
                    </SelectTriggerBase>
                    <SelectContentBase>
                      {timeOptions.map((option) => (
                        <SelectItemBase key={option.value} value={option.value}>
                          {option.label}
                        </SelectItemBase>
                      ))}
                    </SelectContentBase>
                  </SelectBase>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1 *:not-first:mt-1.5">
                <LabelBase
                  htmlFor="end-date"
                  className="text-sm font-medium text-foreground"
                >
                  Data de término
                </LabelBase>
                <PopoverBase onOpenChange={setEndDateOpen} open={endDateOpen}>
                  <PopoverTriggerBase asChild>
                    <ButtonBase
                      className={cn(
                        "group w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]",
                        !endDate && "text-muted-foreground"
                      )}
                      id="end-date"
                      variant={"outline"}
                    >
                      <span
                        className={cn(
                          "truncate",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        {endDate
                          ? format(endDate, "PPP", { locale: ptBR })
                          : "Escolher data"}
                      </span>
                      <CalendarIcon
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground/80"
                        size={16}
                      />
                    </ButtonBase>
                  </PopoverTriggerBase>
                  <PopoverContentBase align="start" className="w-auto p-2">
                    <CalendarBase
                      defaultMonth={endDate}
                      disabled={{ before: startDate }}
                      mode="single"
                      onSelect={(date) => {
                        if (date) {
                          setEndDate(date);
                          setError(null);
                          setEndDateOpen(false);
                        }
                      }}
                      selected={endDate}
                    />
                  </PopoverContentBase>
                </PopoverBase>
              </div>

              {!allDay && (
                <div className="min-w-28 *:not-first:mt-1.5">
                  <LabelBase
                    htmlFor="end-time"
                    className="text-sm font-medium text-foreground"
                  >
                    Horário de término
                  </LabelBase>
                  <SelectBase onValueChange={setEndTime} value={endTime}>
                    <SelectTriggerBase id="end-time">
                      <SelectValueBase placeholder="Selecionar horário" />
                    </SelectTriggerBase>
                    <SelectContentBase>
                      {timeOptions.map((option) => (
                        <SelectItemBase key={option.value} value={option.value}>
                          {option.label}
                        </SelectItemBase>
                      ))}
                    </SelectContentBase>
                  </SelectBase>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <ButtonBase
                aria-pressed={allDay}
                onClick={() => {
                  setAllDay((s) => !s);
                  setError(null);
                }}
                aria-label="Dia inteiro"
                variant={"outline"}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm",
                  allDay
                    ? "bg-primary border-transparent text-white" 
                    : " border border-input"
                )}
              >
                <CalendarIcon size={14} aria-hidden="true" />
                Dia inteiro
              </ButtonBase>
            </div>

            <div className="*:not-first:mt-1.5">
              <LabelBase
                htmlFor="location"
                className="text-sm font-medium text-foreground"
              >
                Localização
              </LabelBase>
              <InputBase
                id="location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
            </div>
            <fieldset className="space-y-4">
              <legend className="font-medium text-foreground text-sm leading-none">
                Cor do evento
              </legend>
              <RadioGroup
                className="flex gap-1.5"
                aria-label="Selecionar cor do evento"
                defaultValue={colorOptions[0]?.value}
                onValueChange={(value: EventColor) => setColor(value)}
                value={color}
              >
                {colorOptions.map((colorOption) => (
                  <RadioGroupItem
                    aria-label={colorOption.label}
                    className={cn(
                      "size-6 shadow-none",
                      colorOption.bgClass,
                      colorOption.borderClass
                    )}
                    id={`color-${colorOption.value}`}
                    key={colorOption.value}
                    value={colorOption.value}
                  />
                ))}
              </RadioGroup>
            </fieldset>
          </div>
          <DialogFooterBase className="flex-row sm:justify-between">
            {event?.id && (
              <ButtonBase
                aria-label="Excluir evento"
                onClick={handleDelete}
                size="icon"
                variant="outline"
              >
                <TrashIcon aria-hidden="true" size={16} />
              </ButtonBase>
            )}
            <div className="flex flex-1 justify-end gap-2">
              <ButtonBase onClick={onClose} variant="outline">
                Cancelar
              </ButtonBase>
              <ButtonBase onClick={handleSave} disabled={Boolean(error)}>
                Salvar
              </ButtonBase>
            </div>
          </DialogFooterBase>
        </motion.div>
      </DialogContentBase>
    </DialogBase>
  );
}
