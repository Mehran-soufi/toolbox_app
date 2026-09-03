import { metroLines } from "./lines";
import { MetroConnection } from "./types";


export const metroConnections: MetroConnection[] = [];


metroLines.forEach((line) => {

    for (let i = 0; i < line.stations.length - 1; i++) {

        const current = line.stations[i];
        const next = line.stations[i + 1];


        metroConnections.push({
            from: current,
            to: next,
            lineId: line.id,
        });


        metroConnections.push({
            from: next,
            to: current,
            lineId: line.id,
        });

    }

});