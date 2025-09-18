"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ptBR } from "react-day-picker/locale";

interface DatePickerProps {
  children?: React.ReactNode;
  value?: Date | string;
  onChange?: (date: Date) => void;
  min?: Date | string;
  max?: Date | string;
}

export function DatePicker({ children, value, onChange, min, max }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value ? (typeof value === 'string' ? new Date(value + "T00:00") : value) : undefined);

  function handleChange(date: Date | undefined) {
    setDate(date);
    if (onChange && date) {
      onChange(date);
    }
    setOpen(false);
  }

  const minDate = typeof min === 'string' ? new Date(min + "T00:00") : min;
  const maxDate = typeof max === 'string' ? new Date(max + "T00:00") : max;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children ? children : (
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Selecione a data"}
            <CalendarIcon />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={handleChange}
          disabled={(minDate || maxDate) ? ({ before: minDate, after: maxDate } as any) : undefined}
          locale={ptBR}
          classNames={{ day: "p-1" }}
        />
      </PopoverContent>
    </Popover>
  );
}