import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityCode = searchParams.get("city") || "1";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://prayer.aviny.com/api/prayertimes/${cityCode}`,
      {
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          Referer: "https://prayer.aviny.com/",
        },
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: `خطای سرویس aviny: ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      prayerTimes: {
        city: data.CityName,
        country: data.CountryName,
        imsaak: data.Imsaak,
        sunrise: data.Sunrise,
        noon: data.Noon,
        sunset: data.Sunset,
        maghreb: data.Maghreb,
        midnight: data.Midnight,
        date: data.Today,
        qamariDate: data.TodayQamari,
        timeZone: data.TimeZone,
      },
    });
  } catch (error) {
    console.error("aviny fetch failed:", error);

    try {
      const fallback = await fetch(
        "https://api.aladhan.com/v1/timingsByCity?city=Tehran&country=Iran&method=8",
        { cache: "no-store" }
      );
      const fbData = await fallback.json();

      return NextResponse.json({
        success: true,
        prayerTimes: {
          city: "تهران",
          country: "ایران",
          imsaak: fbData.data.timings.Imsak,
          sunrise: fbData.data.timings.Sunrise,
          noon: fbData.data.timings.Dhuhr,
          sunset: fbData.data.timings.Sunset,
          maghreb: fbData.data.timings.Maghrib,
          midnight: fbData.data.timings.Midnight,
          date: fbData.data.date.gregorian.date,
          qamariDate: fbData.data.date.hijri.date,
          timeZone: "+03:30",
        },
      });
    } catch (fallbackError) {
      console.error("Fallback failed:", fallbackError);
      return NextResponse.json(
        { success: false, message: "خطای شبکه" },
        { status: 500 }
      );
    }
  }
}