"use client";

import { differenceInMinutes, format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

import {
  AlignLeftIcon,
  CalendarDotsIcon,
  ClockIcon,
  MapPinIcon,
  SunIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react";

import {
  DialogBase,
  DialogContentBase,
} from "@/components/ui/feedback/DialogBase";

import {
  getEventStartDate,
  getEventEndDate,
  isMultiDayEventAgenda,
  formatDurationAgendaDays,
  getAutoColorAgenda,
} from "@/components/ui/event-calendar-view/utils";
import type { CalendarEventAgenda } from "@/components/ui/event-calendar-view/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/data/Badge";
import { SeparatorBase } from "@/components/ui/layout/SeparatorBase";

const colorBannerMap: Record<string, string> = {
  sky:     "from-sky-400 via-sky-500 to-cyan-500",
  amber:   "from-amber-400 via-amber-500 to-orange-400",
  violet:  "from-violet-400 via-violet-500 to-purple-600",
  rose:    "from-rose-400 via-rose-500 to-pink-500",
  emerald: "from-emerald-400 via-emerald-500 to-teal-500",
  orange:  "from-orange-400 via-orange-500 to-amber-500",
  green:   "from-green-400 via-green-500 to-emerald-500",
  blue:    "from-blue-400 via-blue-500 to-indigo-500",
  red:     "from-red-400 via-red-500 to-rose-500",
  purple:  "from-purple-400 via-purple-500 to-violet-600",
  indigo:  "from-indigo-400 via-indigo-500 to-blue-600",
  teal:    "from-teal-400 via-teal-500 to-cyan-500",
  pink:    "from-pink-400 via-pink-500 to-rose-400",
  cyan:    "from-cyan-400 via-cyan-500 to-sky-500",
  lime:    "from-lime-400 via-lime-500 to-green-500",
  fuchsia: "from-fuchsia-400 via-fuchsia-500 to-purple-500",
};

function formatDuration(minutes: number): string {
  if (minutes <= 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

function formatDateFull(date: Date): string {
  return format(date, "EEE',' d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export interface EventDetailModalAgendaProps {
  event?: CalendarEventAgenda;
  onClose?: () => void;
}

export function EventDetailModalAgenda({
  event,
  onClose,
}: EventDetailModalAgendaProps) {
  const [open, setOpen] = useState(true);

  if (!event) return null;

  const color = event.color ?? getAutoColorAgenda(event.id);
  const bannerGradient = colorBannerMap[color] ?? colorBannerMap.sky;

  const startDate = getEventStartDate(event);
  const endDate = getEventEndDate(event);
  const isMultiDay = isMultiDayEventAgenda(event);

  const durationMinutes =
    startDate && endDate ? differenceInMinutes(endDate, startDate) : 0;

  const dateSection = (() => {
    if (!startDate) {
      return { primary: "Sem data definida", secondary: null, isAllDay: false };
    }

    if (event.allDay) {
      if (isMultiDay && endDate && !isSameDay(startDate, endDate)) {
        return {
          primary: `${capitalize(formatDateFull(startDate))}`,
          secondary: `${capitalize(formatDateFull(endDate))}`,
          isAllDay: true,
        };
      }
      return {
        primary: capitalize(formatDateFull(startDate)),
        secondary: null,
        isAllDay: true,
      };
    }

    if (isMultiDay && endDate) {
      const startStr = capitalize(
        format(startDate, "d MMM yyyy, HH:mm", { locale: ptBR }),
      );
      const endStr = capitalize(
        format(endDate, "d MMM yyyy, HH:mm", { locale: ptBR }),
      );
      return { primary: startStr, secondary: endStr, isAllDay: false };
    }

    const dateStr = capitalize(formatDateFull(startDate));
    const timeStr = endDate
      ? `${format(startDate, "HH:mm")} – ${format(endDate, "HH:mm")}`
      : format(startDate, "HH:mm");

    return { primary: dateStr, secondary: timeStr, isAllDay: false };
  })();

  return (
    <DialogBase
      open={open}
      onOpenChange={(v: boolean) => {
        setOpen(v);
        if (!v) onClose?.();
      }}
    >
      <DialogContentBase className="p-0 overflow-hidden gap-0 border-none shadow-2xl sm:max-w-md rounded-2xl">

        <div
          className={cn(
            "relative bg-gradient-to-br w-full flex flex-col justify-end px-7 pt-14 pb-7 select-none overflow-hidden",
            bannerGradient,
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />

          <div className="absolute top-4 left-5 flex items-center gap-2 z-10">
            {dateSection.isAllDay ? (
              <Badge className="bg-black/20 text-white border border-white/20 backdrop-blur-sm shadow-none gap-1 text-[11px] font-medium">
                <SunIcon size={11} weight="bold" />
                Dia todo
              </Badge>
            ) : isMultiDay ? (
              <Badge className="bg-black/20 text-white border border-white/20 backdrop-blur-sm shadow-none gap-1 text-[11px] font-medium">
                <CalendarDotsIcon size={11} weight="bold" />
                {formatDurationAgendaDays(event)}
              </Badge>
            ) : durationMinutes > 0 ? (
              <Badge className="bg-black/20 text-white border border-white/20 backdrop-blur-sm shadow-none gap-1 text-[11px] font-medium">
                <ClockIcon size={11} weight="bold" />
                {formatDuration(durationMinutes)}
              </Badge>
            ) : null}
          </div>

          <h2 className="relative z-10 text-2xl sm:text-[1.75rem] font-bold text-white leading-tight tracking-tight drop-shadow-sm">
            {event.title}
          </h2>
        </div>

        <div className="flex flex-col px-7 py-6 bg-background">

          <div className="flex items-start gap-4 py-4">
            <div className="mt-0.5 p-2 rounded-xl bg-muted border border-border shrink-0">
              <CalendarDotsIcon size={18} weight="duotone" className="text-primary" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[13px] font-semibold text-foreground leading-snug">
                {dateSection.primary}
              </span>
              {dateSection.secondary && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  {(isMultiDay && !event.allDay) || (isMultiDay && dateSection.isAllDay) ? (
                    <>
                      <ArrowRightIcon size={11} className="shrink-0 text-muted-foreground/60" />
                      <span className="text-[12px] font-medium text-muted-foreground">
                        {dateSection.secondary}
                      </span>
                    </>
                  ) : (
                    <span className="text-[12px] font-medium text-muted-foreground">
                      {dateSection.secondary}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {(event.location || event.description) && (
            <SeparatorBase className="opacity-40" />
          )}

          {event.location && (
            <>
              <div className="flex items-start gap-4 py-4">
                <div className="mt-0.5 p-2 rounded-xl bg-muted border border-border shrink-0">
                  <MapPinIcon size={18} weight="duotone" className="text-primary" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                    Localização
                  </span>
                  <span className="text-[13px] font-medium text-foreground leading-snug">
                    {event.location}
                  </span>
                </div>
              </div>
              {event.description && <SeparatorBase className="opacity-40" />}
            </>
          )}

          {event.description && (
            <div className="flex items-start gap-4 py-4">
              <div className="mt-0.5 p-2 rounded-xl bg-muted border border-border shrink-0">
                <AlignLeftIcon size={18} weight="duotone" className="text-primary" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
                  Descrição
                </span>
                <p className="text-[13px] text-muted-foreground leading-relaxed font-normal">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {!event.location && !event.description && (
            <p className="py-4 text-[11px] text-muted-foreground/40 italic text-center">
              Nenhum detalhe adicional disponível.
            </p>
          )}
        </div>

      </DialogContentBase>
    </DialogBase>
  );
}