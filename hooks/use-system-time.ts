import { useState, useEffect } from "react";

interface TimeResponse {
  dateTime: string;
}

export function useSystemTime() {
  const [date, setDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch(
          "https://timeapi.io/api/v1/timezone/zone?timeZone=Asia%2FTehran",
        );

        if (!response.ok) throw new Error("API unavailable");

        const data: TimeResponse = await response.json();
        setDate(new Date(data.dateTime));
        setIsFallback(false);
      } catch {
        console.warn("Using system time as fallback");
        setDate(new Date());
        setIsFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTime();
  }, []);

  return { date, isLoading, isFallback };
}