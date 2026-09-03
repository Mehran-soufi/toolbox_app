"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPinned } from "lucide-react";

import { cn } from "@/lib/utils";
import { metroStations } from "@/lib/metro/stations";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MetroLineBadge from "@/app/tools/metro/MetroLineBadge";

interface StationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function StationSelect({
  value,
  onChange,
  placeholder,
}: StationSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedStation = metroStations.find((station) => station.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="
            w-full
            h-full
            justify-between
            rounded-xl
            border-violet-500/20
            bg-background
            shadow-[0_0_25px_rgba(139,92,246,.08)]
            hover:bg-violet-500/5
            hover:border-violet-500/40
            px-4
            font-normal
          "
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <MapPinned size={18} className="text-violet-500 shrink-0" />

            <span className="truncate">
              {selectedStation ? selectedStation.name : placeholder}
            </span>
          </div>

          <ChevronsUpDown
            className="
              h-4
              w-4
              shrink-0
              opacity-60
            "
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="
          w-(--radix-popover-trigger-width)
          p-0
          rounded-xl
        "
      >
        <Command>
          <CommandInput placeholder="جستجوی ایستگاه..." />

          <CommandList>
            <CommandEmpty>ایستگاهی پیدا نشد.</CommandEmpty>

            <CommandGroup>
              {metroStations.map((station) => (
                <CommandItem
                  key={station.id}
                  value={station.name}
                  onSelect={() => {
                    onChange(station.id);
                    setOpen(false);
                  }}
                  className="
                    cursor-pointer
                  "
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === station.id ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="flex flex-col">
                    <span>{station.name}</span>

                    <span
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >
                      <div className="flex flex-wrap gap-1 mt-1">
                        {station.lineIds.map((lineId) => (
                          <MetroLineBadge key={lineId} lineId={lineId} />
                        ))}
                      </div>
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
