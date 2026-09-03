import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const lat = Number(searchParams.get("lat"));
        const lon = Number(searchParams.get("lon"));

        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
            return NextResponse.json(
                { error: "Invalid coordinates" },
                { status: 400 },
            );
        }

        const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${lat}` +
            `&longitude=${lon}` +
            `&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m` +
            `&hourly=temperature_2m` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset` +
            `&forecast_days=7` +
            `&timezone=Asia%2FTehran`;

        const res = await fetch(url, {
            next: {
                revalidate: 1800,
            },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: "Weather fetch failed" },
                { status: 500 },
            );
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Weather API error:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
        );
    }
}
