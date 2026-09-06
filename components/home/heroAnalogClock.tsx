"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnalogClock } from "@hoseinh/react-analog-clock";

import { useWorldTime } from "@/hooks/use-world-time";

interface ClockConfig {
  size: string;
  handLength: {
    hour: string;
    minute: string;
    second: string;
  };
  handThickness: {
    hour: string;
    minute: string;
    second: string;
  };
}

const DESKTOP_CONFIG: ClockConfig = {
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
};

const LARGE_CONFIG: ClockConfig = {
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
};

const TABLET_CONFIG: ClockConfig = {
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
};

const MOBILE_CONFIG: ClockConfig = {
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
};

function getClockConfig(width: number): ClockConfig {
  if (width < 640) {
    return MOBILE_CONFIG;
  }

  if (width < 1024) {
    return TABLET_CONFIG;
  }

  if (width < 1440) {
    return LARGE_CONFIG;
  }

  return DESKTOP_CONFIG;
}

function HeroAnalogClock() {
  const { time } = useWorldTime({
    onError: (message) =>
      toast.error("خطای اتصال به اینترنت", {
        description: message,
      }),

    onSynced: (offset) => {
      if (Math.abs(offset) > 30000) {
        toast("هماهنگی ساعت با سرور", {
          description:
            "ساعت سیستم شما با سرور اختلاف داشت؛ ساعت هماهنگ شد.",
        });
      }
    },
  });

  const [clockConfig, setClockConfig] = useState<ClockConfig>(
    DESKTOP_CONFIG,
  );

  useEffect(() => {
    const handleResize = () => {
      setClockConfig(getClockConfig(window.innerWidth));
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // تا زمانی که زمان آماده نشده، ساعت نمایش داده نمی‌شود.
  // بنابراین نیازی به state جداگانه برای mounted بودن کامپوننت نداریم.
  if (!time) {
    return null;
  }

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
