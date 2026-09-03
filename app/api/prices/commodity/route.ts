import { NextResponse } from "next/server";

const BRS_API_URL = "https://api.brsapi.ir/Market/Commodity.php";

export async function GET() {
  const apiKey = process.env.BRS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "کلید API تنظیم نشده است.",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${BRS_API_URL}?key=${encodeURIComponent(apiKey)}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "دریافت اطلاعات کالاها از سرویس قیمت ناموفق بود.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Commodity API error:", error);

    return NextResponse.json(
      {
        error: "خطا در ارتباط با سرویس قیمت کالاها.",
      },
      { status: 500 }
    );
  }
}