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
} from "@/components/ui/event-calendar-view/utils";
import type { CalendarEventAgenda } from "@/components/ui/event-calendar-view/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/data/Badge";
import { SeparatorBase } from "@/components/ui/layout/SeparatorBase";

const colorBannerMap: Record<string, string> = {
  sky: "from-sky-400 to-sky-500",
  amber: "from-amber-400 to-amber-500",
  violet: "from-violet-400 to-violet-500",
  rose: "from-rose-400 to-rose-500",
  emerald: "from-emerald-400 to-emerald-500",
  orange: "from-orange-400 to-orange-500",
  green: "from-green-400 to-green-500",
  blue: "from-blue-400 to-blue-500",
  red: "from-red-400 to-red-500",
  purple: "from-purple-400 to-purple-500",
  indigo: "from-indigo-400 to-indigo-500",
  teal: "from-teal-400 to-teal-500",
  pink: "from-pink-400 to-pink-500",
  cyan: "from-cyan-400 to-cyan-500",
  lime: "from-lime-400 to-lime-500",
  fuchsia: "from-fuchsia-400 to-fuchsia-500",
};

const colorPillMap: Record<string, string> = {
  sky: "bg-sky-100/80 text-sky-700 border-border dark:bg-sky-500/20 dark:text-sky-200",
  amber:
    "bg-amber-100/80 text-amber-700 border-border dark:bg-amber-500/20 dark:text-amber-200",
  violet:
    "bg-violet-100/80 text-violet-700 border-border dark:bg-violet-500/20 dark:text-violet-200",
  rose: "bg-rose-100/80 text-rose-700 border-border dark:bg-rose-500/20 dark:text-rose-200",
  emerald:
    "bg-emerald-100/80 text-emerald-700 border-border dark:bg-emerald-500/20 dark:text-emerald-200",
  orange:
    "bg-orange-100/80 text-orange-700 border-border dark:bg-orange-500/20 dark:text-orange-200",
  green:
    "bg-green-100/80 text-green-700 border-border dark:bg-green-500/20 dark:text-green-200",
  blue: "bg-blue-100/80 text-blue-700 border-border dark:bg-blue-500/20 dark:text-blue-200",
  red: "bg-red-100/80 text-red-700 border-border dark:bg-red-500/20 dark:text-red-200",
  purple:
    "bg-purple-100/80 text-purple-700 border-border dark:bg-purple-500/20 dark:text-purple-200",
  indigo:
    "bg-indigo-100/80 text-indigo-700 border-border dark:bg-indigo-500/20 dark:text-indigo-200",
  teal: "bg-teal-100/80 text-teal-700 border-border dark:bg-teal-500/20 dark:text-teal-200",
  pink: "bg-pink-100/80 text-pink-700 border-border dark:bg-pink-500/20 dark:text-pink-200",
  cyan: "bg-cyan-100/80 text-cyan-700 border-border dark:bg-cyan-500/20 dark:text-cyan-200",
  lime: "bg-lime-100/80 text-lime-700 border-border dark:bg-lime-500/20 dark:text-lime-200",
  fuchsia:
    "bg-fuchsia-100/80 text-fuchsia-700 border-border dark:bg-fuchsia-500/20 dark:text-fuchsia-200",
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

  const color = event.color ?? "sky";
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
      <DialogContentBase className="p-0 overflow-hidden gap-0 border-none shadow-xl sm:max-w-md">
        <div
          className={cn(
            "relative bg-gradient-to-tl w-full flex flex-col justify-end px-6 pt-12 pb-8 select-none transition-all duration-300",
            bannerGradient,
          )}
        >
          <div className="absolute top-4 left-6 flex items-center gap-2">
            {dateSection.isAllDay ? (
              <Badge className="bg-white/20 text-white  backdrop-blur-md">
                <SunIcon size={12} weight="bold" />
                Dia todo
              </Badge>
            ) : isMultiDay ? (
              <Badge className="bg-white/20 text-white  backdrop-blur-md">
                <CalendarDotsIcon size={12} weight="bold" />
                Multi-dia
              </Badge>
            ) : durationMinutes > 0 ? (
              <Badge className="bg-white/20 text-white  backdrop-blur-md">
                <ClockIcon size={12} weight="bold" />
                {formatDuration(durationMinutes)}
              </Badge>
            ) : null}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
            {event.title}
          </h2>
        </div>

        <div className="flex flex-col gap-6 px-6 py-8 bg-background">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-muted/50 border border-border">
              <CalendarDotsIcon
                size={20}
                weight="duotone"
                className="text-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground leading-none">
                {dateSection.primary}
              </span>
              {dateSection.secondary && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  {(isMultiDay && !event.allDay) ||
                  (isMultiDay && dateSection.isAllDay) ? (
                    <>
                      <ArrowRightIcon
                        size={12}
                        className="shrink-0 opacity-70"
                      />
                      <span className="font-medium">
                        {dateSection.secondary}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-foreground/70">
                      {dateSection.secondary}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <SeparatorBase className="opacity-50" />

          {event.location && (
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-muted/50 border border-border">
                <MapPinIcon
                  size={20}
                  weight="duotone"
                  className="text-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Localização
                </span>
                <span className="text-sm text-foreground font-medium">
                  {event.location}
                </span>
              </div>
            </div>
          )}

          {event.description && (
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-muted/50 border border-border">
                <AlignLeftIcon
                  size={20}
                  weight="duotone"
                  className="text-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Descrição
                </span>
                <div className="text-sm text-muted-foreground leading-relaxed font-normal">
                  {event.description}
                </div>
              </div>
            </div>
          )}

          {!event.location && !event.description && (
            <p className="text-xs text-muted-foreground/60 italic text-center py-2 border border-dashed border-border rounded-lg">
              Nenhum detalhe adicional disponível.
            </p>
          )}
        </div>
      </DialogContentBase>
    </DialogBase>
  );
}
