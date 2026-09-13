'use client'

import { worldClocks } from "@/lib/world-clock";
import ReligiousTimes from "./religious-times";
import Time from "./time";
import WorldClock from "./world-clock";
import { useToolHistory } from "@/hooks/useToolHistory";

export default function ClockContainer() {

      useToolHistory({
          toolName: "ساعت",
          toolSlug: "clock",
          toolIcon: "Clock",
        });

  return (
          <div className="w-full flex flex-col items-center lg:gap-y-5 md:gap-y-4 gap-y-3">
            <div className="w-full flex items-stretch justify-between gap-3 xl:flex-row flex-col-reverse">
              <ReligiousTimes />
              <Time />
            </div>
            <div className="w-full grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2">
              {worldClocks.map((clock) => (
                <WorldClock key={clock.id} clock={clock} />
              ))}
            </div>
          </div>
  )
}
