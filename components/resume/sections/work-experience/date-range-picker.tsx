"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DATE_FORMATS, DateFormatType } from "@/lib/validations/resume";

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  dateFormat?: DateFormatType;
  onDateFormatChange?: (format: DateFormatType) => void;
  onChange: (data: {
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }) => void;
  className?: string;
  disabled?: boolean;
}

const DATE_FORMAT_MAP = {
  "MMM YYYY": "MMM yyyy",
  "MM/YYYY": "MM/yyyy",
  "YYYY-MM": "yyyy-MM",
  "MMMM YYYY": "MMMM yyyy",
} as const;

export function DateRangePicker({
  startDate,
  endDate,
  isCurrent = false,
  dateFormat = "MMM YYYY",
  onDateFormatChange,
  onChange,
  className,
  disabled,
}: DateRangePickerProps) {
  const formatString = DATE_FORMAT_MAP[dateFormat];

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const start = startDate
      ? parse(startDate, formatString, new Date())
      : undefined;
    const end = endDate ? parse(endDate, formatString, new Date()) : undefined;

    if (start && isValid(start)) {
      return {
        from: start,
        to: end && isValid(end) ? end : undefined,
      };
    }
    return undefined;
  });

  const [isCurrentPosition, setIsCurrentPosition] = useState(isCurrent);

  useEffect(() => {
    setIsCurrentPosition(isCurrent);
  }, [isCurrent]);

  useEffect(() => {
    const start = startDate
      ? parse(startDate, formatString, new Date())
      : undefined;
    const end = endDate ? parse(endDate, formatString, new Date()) : undefined;

    if (start && isValid(start)) {
      setDate({
        from: start,
        to: end && isValid(end) ? end : undefined,
      });
    } else {
      setDate(undefined);
    }
  }, [startDate, endDate, formatString]);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);

    if (range?.from) {
      const newStartDate = format(range.from, formatString);
      const newEndDate = range.to ? format(range.to, formatString) : "";

      onChange({
        startDate: newStartDate,
        endDate: isCurrentPosition ? "" : newEndDate,
        isCurrent: isCurrentPosition,
      });
    } else {
      onChange({
        startDate: "",
        endDate: "",
        isCurrent: isCurrentPosition,
      });
    }
  };

  const handleCurrentToggle = (checked: boolean) => {
    setIsCurrentPosition(checked);
    if (date?.from) {
      const newStartDate = format(date.from, formatString);
      // If turning ON current, clear end date. If turning OFF, use selected end date if available
      const newEndDate = checked
        ? ""
        : date.to
        ? format(date.to, formatString)
        : "";

      onChange({
        startDate: newStartDate,
        endDate: newEndDate,
        isCurrent: checked,
      });
    } else {
      onChange({
        startDate: "",
        endDate: "",
        isCurrent: checked,
      });
    }
  };

  const handleDateFormatChange = (newFormat: DateFormatType) => {
    onDateFormatChange?.(newFormat);
    // Clear dates when format changes to avoid format mismatch
    if (date?.from) {
      onChange({
        startDate: "",
        endDate: "",
        isCurrent: isCurrentPosition,
      });
      setDate(undefined);
    }
  };

  const formatDisplayDate = () => {
    if (!date?.from) return <span>Pick a date range</span>;

    if (isCurrentPosition) {
      return (
        <>
          {format(date.from, formatString)} - <span>Present</span>
        </>
      );
    }

    if (date.to) {
      return (
        <>
          {format(date.from, formatString)} - {format(date.to, formatString)}
        </>
      );
    }

    return format(date.from, formatString);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-full ",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDisplayDate()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card" align="start">
          <div className="p-3 border-b border-border">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="current-position"
                  checked={isCurrentPosition}
                  onCheckedChange={handleCurrentToggle}
                />
                <Label
                  htmlFor="current-position"
                  className="text-sm font-medium"
                >
                  I currently work here
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Format:
                </Label>
                <Select
                  value={dateFormat}
                  onValueChange={handleDateFormatChange}
                  disabled={disabled}
                >
                  <SelectTrigger className="h-8 w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DATE_FORMATS).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={(date) => date > new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
