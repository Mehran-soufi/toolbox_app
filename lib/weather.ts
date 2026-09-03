export async function getWeather(lat: number, lon: number) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "surface_pressure",
      "precipitation",
      "cloud_cover",
    ].join(","),

    hourly: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation_probability",
      "weather_code",
      "wind_speed_10m",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "wind_direction_10m_dominant",
      "uv_index_max",
      "sunrise",
      "sunset",
      "daylight_duration",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
    {
      next: {
        revalidate: 1800,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  return res.json();
}