import { Repeat, TrainFront } from "lucide-react";

import { RouteResult } from "@/lib/metro/types";
import { metroLines } from "@/lib/metro/lines";

interface Props {
  route: RouteResult;
}

export default function RouteResultCard({ route }: Props) {
  function getLineInfo(lineId: number) {
    return metroLines.find((line) => line.id === lineId);
  }

  return (
    <div
      className="
      w-full
      mt-5
      rounded-2xl
      border
      bg-background
      p-5
      shadow-sm
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        mb-6
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          font-semibold
          "
        >
          <TrainFront size={20} />
          مسیر پیشنهادی
        </div>

        <span className="text-sm text-muted-foreground">
          {route.totalStations - 1} ایستگاه
        </span>
      </div>

      <div className="flex flex-col gap-8">
        {route.sections.map((section, sectionIndex) => {
          const line = getLineInfo(section.lineId);

          return (
            <div
              key={`${section.lineId}-${sectionIndex}`}
              className="flex flex-col gap-4"
            >
              {/* Line */}

              <div
                className="
            flex
            items-center
            gap-2
            "
              >
                <span
                  className="
              w-4
              h-4
              rounded-full
              "
                  style={{
                    backgroundColor: line?.color,
                  }}
                />

                <div className="flex flex-col">

<span>
{line?.name}
</span>

<span className="text-xs text-muted-foreground">
{section.direction}
</span>

</div>
              </div>

              {/* Stations */}

              <div
                className="
            flex
            flex-col
            md:flex-row
            md:flex-wrap
            md:items-center
            gap-3
            "
              >
                {section.stations.map((station, index) => {
                  const last = index === section.stations.length - 1;

                  return (
                    <div
                      key={`${station}-${index}`}
                      className="
                flex
                md:flex-row
                flex-col
                md:items-center
                gap-3
                "
                    >
                      <div
                        className="
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap
                  "
                      >
                        <span
                          className="
                    w-4
                    h-4
                    rounded-full
                    border-2
                    shrink-0
                    "
                          style={{
                            borderColor: line?.color,
                          }}
                        />

                        <span>{station}</span>
                      </div>

                      {!last && (
                        <div
                          className="
                  md:w-10
                  md:h-1

                  w-1
                  h-8

                  mr-1.5
                  "
                          style={{
                            backgroundColor: line?.color,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Change */}

              {route.changes[sectionIndex] && (
                <div
                  className="
            flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
            "
                >
                  <Repeat size={16} />

                  <span>تعویض خط در:</span>

                  <span
                    className="
              font-medium
              text-foreground
              "
                  >
                    {route.changes[sectionIndex].station}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <div
        className="
      mt-6
      pt-4
      border-t
      text-sm
      text-muted-foreground
      "
      >
        تعداد تعویض خط:
        <span
          className="
        font-medium
        text-foreground
        mr-2
        "
        >
          {route.totalChanges}
        </span>
      </div>
    </div>
  );
}
