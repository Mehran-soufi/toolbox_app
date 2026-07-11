import { Search, Snowflake } from "lucide-react";
import { AnalogClock } from "@hoseinh/react-analog-clock";
import HeroHeader from "./heroHeader";
import HeroSearch from "./heroSearch";
import HeroWeather from "./heroWeather";
import HeroDate from "./heroDate";
import HeroAnalogClock from "./heroAnalogClock";

function Hero() {
  return (
    <div className="flex items-center justify-between">
      {/* Right */}
      <div className="flex flex-col gap-y-2 w-2/3">
        <HeroHeader />
        <HeroSearch />
      </div>
      {/* Left */}
      <div className="w-1/3 rounded-2xl border dark:bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(173,70,255,.15)] p-3">
        <div className="flex items-center justify-between gap-1.5">
          {/* weather & date */}
          <div className="max-w-2/5 flex flex-col items-center justify-center">
            {/* weather */}
            <HeroWeather />
            <div className="w-full h-[1] bg-gray-500 dark:bg-gray-400 my-1"></div>
            {/* date */}
            <HeroDate />
          </div>
          {/* clock  */}
          <HeroAnalogClock />
        </div>
      </div>
    </div>
  );
}

export default Hero;
