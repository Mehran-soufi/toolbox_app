import { metroLines } from "./lines";
import { MetroStation } from "./types";

export const metroStations: MetroStation[] = Object.values(
  metroLines
    .flatMap((line) =>
      line.paths.flatMap((path) =>
        path.stations.map((stationName) => ({
          name: stationName.trim(),
          lineId: line.id,
        }))
      )
    )
    .reduce((acc, station) => {
      const key = station.name;

      if (!acc[key]) {
        acc[key] = {
          id: key,
          name: key,
          lineIds: [],
        };
      }

      if (!acc[key].lineIds.includes(station.lineId)) {
        acc[key].lineIds.push(station.lineId);
      }

      return acc;
    }, {} as Record<string, MetroStation>)
).sort((a, b) => a.name.localeCompare(b.name, "fa"));