// components/HeroAnalogClock.tsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnalogClock } from "@hoseinh/react-analog-clock";
import { useWorldTime } from "@/hooks/use-world-time";

function HeroAnalogClock() {
  const { time } = useWorldTime({
    onError: (message) =>
      toast.error("خطای اتصال به اینترنت", {
        description: message,
      }),
    onSynced: (offset) => {
      if (Math.abs(offset) > 30000) {
        toast("هماهنگی ساعت با سرور", {
          description: "ساعت سیستم شما با سرور اختلاف داشت؛ ساعت هماهنگ شد.",
        });
      }
    },
  });

  const [clockConfig, setClockConfig] = useState({
    size: "140px",
    handLength: {
      hour: "50px",
      minute: "60px",
      second: "65px",
    },
    handThickness: {
      hour: "2px",
      minute: "2px",
      second: "2px",
    },
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setClockConfig({
          size: "110px",
          handLength: {
            hour: "40px",
            minute: "46px",
            second: "53px",
          },
          handThickness: {
            hour: "2px",
            minute: "2px",
            second: "1px",
          },
        });
      } else if (window.innerWidth < 1024) {
        setClockConfig({
          size: "120px",
          handLength: {
            hour: "43px",
            minute: "48px",
            second: "56px",
          },
          handThickness: {
            hour: "2px",
            minute: "2px",
            second: "2px",
          },
        });
      } else if (window.innerWidth < 1440) {
        setClockConfig({
          size: "130px",
          handLength: {
            hour: "45px",
            minute: "50px",
            second: "58px",
          },
          handThickness: {
            hour: "2px",
            minute: "2px",
            second: "2px",
          },
        });
      } else {
        setClockConfig({
          size: "160px",
          handLength: {
            hour: "53px",
            minute: "63px",
            second: "68px",
          },
          handThickness: {
            hour: "2px",
            minute: "2px",
            second: "2px",
          },
        });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !time) return null;

  return (
    <AnalogClock
      key={time.getTime()}
      staticDate={time}
      showMinuteHand={true}
      showSecondHand={true}
      showBorder={true}
      showHandBase={true}
      smooth={false}
      whiteNumbers={true}
      square={false}
      numbersType="numbersAndLines"
      borderColor="#c084fc"
      handBaseColor="#c084fc"
      handColor={{
        hour: "#faf5ff",
        minute: "#faf5ff",
        second: "#e879f9",
      }}
      handLength={clockConfig.handLength}
      handThickness={clockConfig.handThickness}
      size={clockConfig.size}
      backgroundColor="#170d2b"
    />
  );
}

export default HeroAnalogClock;