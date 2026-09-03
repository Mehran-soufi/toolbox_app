import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.codebazan.ir/time-date/?json=all",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch time");
    }

    const data = await response.json();

    if (!data.ok || !data.result) {
      throw new Error("Invalid API response");
    }

    const result = data.result;

    return NextResponse.json({
      success: true,

      // ساعت میلادی
      time: {
        hour: Number(result.hour),
        minute: Number(result.min),
        second: Number(result.sec),
      },

      // تاریخ میلادی
      date: {
        day: Number(result.day),
        month: result.month,
        year: Number(result.year),
      },

      // تاریخ شمسی آماده
      persianDate: {
        day: result.faday,
        month: result.famonth,
        year: result.fayear,
        dayName: result.fanameday,
      },

      timezone: "Asia/Tehran",

      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("TIME API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Cannot fetch time",
      },
      {
        status: 500,
      }
    );
  }
}