import { NextResponse } from "next/server";

const API_URL = "https://api.brsapi.ir/Market/Gold_Currency.php";

export async function GET() {
  try {
    const apiKey = process.env.BRS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "کلید API تنظیم نشده است",
        },
        {
          status: 500,
        }
      );
    }

    const response = await fetch(`${API_URL}?key=${apiKey}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "خطا در دریافت اطلاعات قیمت‌ها",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Prices API Error:", error);

    return NextResponse.json(
      {
        error: "دریافت اطلاعات قیمت‌ها با خطا مواجه شد",
      },
      {
        status: 500,
      }
    );
  }
}