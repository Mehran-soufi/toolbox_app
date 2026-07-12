export async function getWeather(
  lat: number,
  lon: number
) {

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTehran`,
    {
      next: {
        revalidate: 1800,
      },
    }
  );


  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }


  return res.json();
}