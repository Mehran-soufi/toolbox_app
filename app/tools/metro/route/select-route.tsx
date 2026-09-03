"use client";

import { useState } from "react";
import { Search, ChevronsUpDown, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import { RouteResult } from "@/lib/metro/types";
import { metroStations } from "@/lib/metro/stations";
import { findRoute } from "@/lib/metro/route-finder";
import RouteResultCard from "./route-result";

function StationSelect({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="
          w-full h-full justify-between
          rounded-xl
          border-violet-500/20
          bg-background
          shadow-[0_0_25px_rgba(139,92,246,.08)]
          text-sm lg:text-base
          "
        >
          {value || placeholder}

          <ChevronsUpDown size={16} className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-75 p-0" align="start">
        <Command>
          <CommandInput placeholder="جستجوی ایستگاه..." />

          <CommandEmpty>ایستگاهی پیدا نشد</CommandEmpty>

          <CommandGroup className="max-h-72 overflow-y-auto">
            {metroStations.map((station) => (
              <CommandItem
                key={station.id}
                value={station.name}
                onSelect={(current) => {
                  setValue(current);
                  setOpen(false);
                }}
              >
                <Check
                  size={16}
                  className={cn(
                    "mr-2",
                    value === station.name ? "opacity-100" : "opacity-0",
                  )}
                />

                {station.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function SelectRoute() {
  const [start, setStart] = useState("");

  const [destination, setDestination] = useState("");

  const [result, setResult] = useState<RouteResult | null>(null);

  function handleSearch() {
    if (!start || !destination) return;

    const route = findRoute(start, destination);

    if (route) {
      console.log(route);
    }

    setResult(route);
  }

  return (
    <div className="w-full flex flex-col gap-y-3">
      <p className="md:text-base text-sm">
        در این قسمت میتوانید با انتخاب ایستگاه مبدا و مقصد، بهترین مسیر مترو
        تهران را پیدا کنید.
      </p>

      <div className=" w-full grid md:grid-cols-3 grid-cols-1 gap-2">
        <div className="h-16">
          <StationSelect
            value={start}
            setValue={setStart}
            placeholder="ایستگاه مبدا"
          />
        </div>

        <div className="h-16">
          <StationSelect
            value={destination}
            setValue={setDestination}
            placeholder="ایستگاه مقصد"
          />
        </div>

        <div className="h-16">
          <Button
            onClick={handleSearch}
            className="w-full h-full text-sm lg:text-base
"
            variant="outline"
          >
            <Search size={16} />
            جستجو مسیر
          </Button>
        </div>
      </div>

      {result && <RouteResultCard route={result} />}
    </div>
  );
}
