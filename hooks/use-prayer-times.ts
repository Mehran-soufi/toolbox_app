"use client";

import { useEffect, useState } from "react";

interface PrayerTimes {
  city: string;
  country: string;
  imsaak: string;
  sunrise: string;
  noon: string;
  sunset: string;
  maghreb: string;
  midnight: string;
  date: string;
  qamariDate: string;
  timeZone: string;
}

export function usePrayerTimes(cityCode = "1") {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTimes() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/prayer?city=${cityCode}`);
        const data = await res.json();

        if (data.success) {
          setTimes(data.prayerTimes);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("خطا در دریافت اوقات شرعی");
      } finally {
        setLoading(false);
      }
    }

    fetchTimes();
  }, [cityCode]);

  return { times, loading, error };
}