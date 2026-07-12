"use client";

import { useEffect, useState } from "react";
import { AnalogClock } from "@hoseinh/react-analog-clock";

function HeroAnalogClock() {
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
          size: "100px",
          handLength: {
            hour: "35px",
            minute: "45px",
            second: "50px",
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
            hour: "42px",
            minute: "52px",
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
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;

  return (
    <AnalogClock
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