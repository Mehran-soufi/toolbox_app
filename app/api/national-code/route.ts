import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.National_Code_API_KEY;

export async function GET(request: NextRequest) {
  try {
    if (!API_KEY) {
      console.error("FAST_CREAT_API_KEY is not configured");

      return NextResponse.json(
        {
          ok: false,
          message: "تنظیمات سرویس کامل نیست.",
        },
        { status: 500 }
      );
    }

    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          ok: false,
          message: "کد ملی وارد نشده است.",
        },
        { status: 400 }
      );
    }

    const normalizedCode = code.replace(/\D/g, "");

    if (normalizedCode.length !== 10) {
      return NextResponse.json(
        {
          ok: false,
          message: "کد ملی باید ۱۰ رقم باشد.",
        },
        { status: 400 }
      );
    }

    const url = new URL("https://api.fast-creat.ir/codemeli");

    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("code", normalizedCode);

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "ارتباط با سرویس اعتبارسنجی برقرار نشد.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("National code API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "خطایی هنگام بررسی کد ملی رخ داد.",
      },
      { status: 500 }
    );
  }
}