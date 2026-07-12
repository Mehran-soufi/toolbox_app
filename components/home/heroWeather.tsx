import { getWeather } from "@/lib/weather";
import { defaultCity } from "@/lib/cities";
import { weatherCode } from "@/lib/weather-code";
import { toPersianNumber } from "@/lib/number";

async function HeroWeather() {
  const data = await getWeather(defaultCity.lat, defaultCity.lon);

  const current = data.current;
  const daily = data.daily;

  const weather =
    weatherCode[current.weather_code as keyof typeof weatherCode] ??
    weatherCode[0];

  const WeatherIcon = weather.icon;

  return (
    <div className="w-full flex flex-col gap-y-0.5 px-2">
      {/* city */}
      <div className="flex items-center justify-end">
        <p>{defaultCity.name}</p>
      </div>

      {/* temperature */}
      <div className="flex items-center justify-between">
        <div
          className="
          flex 
          flex-col 
          gap-0.5 
          items-center
        "
        >
          <p
            className="
              xl:text-3xl 
              lg:text-2xl 
              md:text-xl 
              text-lg 
              font-bold
            "
          >
            {toPersianNumber(Math.round(current.temperature_2m))}°
          </p>

          <span>{weather.title}</span>
        </div>

        <div className={weather.color}>
          <WeatherIcon size={40} strokeWidth={1.8} />
        </div>
      </div>

      {/* min max */}
      <div
        className="
        flex 
        items-center 
        justify-between 
        text-sm
        text-gray-500
        dark:text-gray-400
      "
      >
        <div className="flex gap-x-1.5-1">
          <span>کمینه:</span>
          <span>
            {toPersianNumber(Math.round(daily.temperature_2m_min[0]))}°
          </span>
        </div>

        <div className="flex gap-1">
          <span>بیشینه:</span>

          <span>
            {toPersianNumber(Math.round(daily.temperature_2m_max[0]))}°
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroWeather;
