import HeroHeader from "./heroHeader";
import HeroSearch from "./heroSearch";
import HeroWeather from "./heroWeather";
import HeroDate from "./heroDate";
import HeroAnalogClock from "./heroAnalogClock";

function Hero() {
  return (
    <div className="w-full flex items-center justify-between flex-wrap">
      {/* Right */}
      <div className="flex flex-col gap-y-2 lg:w-2/3 w-full">
        <HeroHeader />
        <HeroSearch />
      </div>
      {/* Left */}
      <div className="lg:w-1/3 w-full rounded-2xl border dark:bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(173,70,255,.15)] p-3">
        <div className="flex items-center justify-between">
          {/* weather & date */}
          <div className="sm:max-w-2/5 w-1/2 flex flex-col items-center justify-center">
            {/* weather */}
            <HeroWeather />
            <div className="w-full h-[1] bg-gray-500 dark:bg-gray-400 my-1"></div>
            {/* date */}
            <HeroDate />
          </div>
          {/* clock  */}
          <div className="rounded-full shadow-[0_0_35px_rgba(168,85,247,0.35)]">
            <HeroAnalogClock />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
