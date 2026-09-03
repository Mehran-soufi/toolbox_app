import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.fast-creat.ir/short";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.FAST_CREAT_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "کلید API تنظیم نشده است.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const link =
      typeof body?.link === "string"
        ? body.link.trim()
        : "";

    if (!link) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفاً لینک را وارد کنید.",
        },
        { status: 400 }
      );
    }

    // اعتبارسنجی لینک
    try {
      const url = new URL(link);

      if (!["http:", "https:"].includes(url.protocol)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "لینک باید با http یا https شروع شود.",
          },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "لینک واردشده معتبر نیست.",
        },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      apikey: apiKey,
      link,
    });

    const response = await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ارتباط با سرویس کوتاه‌کننده لینک برقرار نشد.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    // بررسی پاسخ واقعی Fast-Creat
    if (
      data?.ok !== true ||
      data?.status !== "successfully" ||
      !data?.result?.link
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "سرویس نتوانست لینک را کوتاه کند.",
        },
        { status: 502 }
      );
    }

    const shortUrl = data.result.link;

    // اطمینان از معتبر بودن لینک برگشتی
    try {
      const shortenedUrl = new URL(shortUrl);

      if (
        !["http:", "https:"].includes(
          shortenedUrl.protocol
        )
      ) {
        throw new Error("Invalid URL");
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "لینک کوتاه دریافت‌شده معتبر نیست.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      shortUrl,
      originalUrl: link,
    });
  } catch (error) {
    console.error("URL Shortener Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "خطایی هنگام کوتاه کردن لینک رخ داد.",
      },
      { status: 500 }
    );
  }
}