"use client";

import { AnalogClock } from "@hoseinh/react-analog-clock"

function HeroAnalogClock() {
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
            borderColor="#ad46ff"
            handBaseColor="#ad46ff"
            handColor={{
              hour: "#ffffff",
              minute: "#ffffff",
              second: "#8a0194",
            }}
            handLength={{ hour: "50px", minute: "60px", second: "65px" }}
            handThickness={{ hour: "2px", minute: "2px", second: "2px" }}
            size="140px"
            backgroundColor="#27272a"
          />
  )
}

export default HeroAnalogClock