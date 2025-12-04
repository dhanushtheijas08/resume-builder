"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateFormatType, DATE_FORMATS } from "@/lib/validations/resume";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  dateFormat: DateFormatType;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

// Helper function to parse date string to Date object
const parseDate = (dateStr: string, dateFormat: DateFormatType): Date | undefined => {
  if (!dateStr) return undefined;

  try {
    const currentYear = new Date().getFullYear();
    
    switch (dateFormat) {
      case "MMM YYYY": {
        // "Jan 2021"
        const months: { [key: string]: number } = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        const [month, year] = dateStr.split(" ");
        return new Date(parseInt(year), months[month], 1);
      }
      case "MM/YYYY": {
        // "01/2021"
        const [month, year] = dateStr.split("/");
        return new Date(parseInt(year), parseInt(month) - 1, 1);
      }
      case "YYYY-MM": {
        // "2021-01"
        const [year, month] = dateStr.split("-");
        return new Date(parseInt(year), parseInt(month) - 1, 1);
      }
      case "MMMM YYYY": {
        // "January 2021"
        const months: { [key: string]: number } = {
          January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
          July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        const [month, year] = dateStr.split(" ");
        return new Date(parseInt(year), months[month], 1);
      }
      default:
        return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

// Helper function to format Date object to string
const formatDateToString = (date: Date, dateFormat: DateFormatType): string => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthsFull = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = date.getMonth();
  const year = date.getFullYear();

  switch (dateFormat) {
    case "MMM YYYY":
      return `${months[month]} ${year}`;
    case "MM/YYYY":
      return `${String(month + 1).padStart(2, "0")}/${year}`;
    case "YYYY-MM":
      return `${year}-${String(month + 1).padStart(2, "0")}`;
    case "MMMM YYYY":
      return `${monthsFull[month]} ${year}`;
    default:
      return "";
  }
};

export function DatePicker({
  value,
  onChange,
  dateFormat,
  disabled,
  placeholder = "Select date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = value ? parseDate(value, dateFormat) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDateToString(date, dateFormat);
      onChange(formattedDate);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-9",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? value : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}
