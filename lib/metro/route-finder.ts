import { metroGraph } from "./graph";
import { RouteChange, RouteResult, RouteSection } from "./types";
import { metroLines } from "./lines";

type State = {
  key: string;
  cost: number;
};

type PreviousNode = {
  prev: string;
  lineId: number;
};

export function findRoute(
  start: string,
  destination: string
): RouteResult | null {
  if (!start || !destination) {
    return null;
  }

  if (start === destination) {
    return {
      sections: [],
      changes: [],
      totalStations: 1,
      totalChanges: 0,
    };
  }

  const distances = new Map<string, number>();

  const previous = new Map<string, PreviousNode>();

  const queue: State[] = [];

  // --------------------------------------------------
  // Start nodes
  // --------------------------------------------------

  metroGraph.forEach((node, key) => {
    if (node.station === start) {
      distances.set(key, 0);

      queue.push({
        key,
        cost: 0,
      });
    }
  });

  if (queue.length === 0) {
    return null;
  }

  // --------------------------------------------------
  // Dijkstra
  // --------------------------------------------------

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost);

    const current = queue.shift();

    if (!current) {
      break;
    }

    const currentDistance = distances.get(current.key);

    if (
      currentDistance === undefined ||
      current.cost !== currentDistance
    ) {
      continue;
    }

    const currentNode = metroGraph.get(current.key);

    if (!currentNode) {
      continue;
    }

    for (const edge of currentNode.neighbors) {
      const nextKey = `${edge.node.station}-${edge.node.lineId}`;

      const newCost = current.cost + edge.cost;

      const oldCost = distances.get(nextKey);

      if (oldCost === undefined || newCost < oldCost) {
        distances.set(nextKey, newCost);

        previous.set(nextKey, {
          prev: current.key,
          lineId: edge.lineId,
        });

        queue.push({
          key: nextKey,
          cost: newCost,
        });
      }
    }
  }

  // --------------------------------------------------
  // Find best destination node
  // --------------------------------------------------

  let endKey: string | undefined;
  let endCost = Infinity;

  metroGraph.forEach((node, key) => {
    if (node.station !== destination) {
      return;
    }

    const distance = distances.get(key);

    if (distance !== undefined && distance < endCost) {
      endCost = distance;
      endKey = key;
    }
  });

  if (!endKey) {
    return null;
  }

  // --------------------------------------------------
  // Reconstruct path
  // --------------------------------------------------

  const path: {
    station: string;
    lineId: number;
  }[] = [];

  let currentKey = endKey;

  const destinationNode = metroGraph.get(currentKey);

  if (!destinationNode) {
    return null;
  }

  path.unshift({
    station: destinationNode.station,
    lineId: destinationNode.lineId,
  });

  while (previous.has(currentKey)) {
    const previousData = previous.get(currentKey);

    if (!previousData) {
      break;
    }

    currentKey = previousData.prev;

    const node = metroGraph.get(currentKey);

    if (!node) {
      break;
    }

    path.unshift({
      station: node.station,
      lineId: node.lineId,
    });
  }

  if (path.length < 2) {
    return null;
  }

  // --------------------------------------------------
  // Build sections
  // --------------------------------------------------

  const sections: RouteSection[] = [];
  const changes: RouteChange[] = [];

  let currentLine = path[0].lineId;

  let currentStations: string[] = [path[0].station];

  for (let i = 1; i < path.length; i++) {
    const step = path[i];

    // Same line
    if (step.lineId === currentLine) {
      currentStations.push(step.station);
      continue;
    }

    // ------------------------------------------------
    // Line change
    // ------------------------------------------------

    const changeStation =
      currentStations[currentStations.length - 1];

    changes.push({
      station: changeStation,
      fromLine: currentLine,
      toLine: step.lineId,
    });

    sections.push({
      lineId: currentLine,
      stations: currentStations,
      direction: getDirection(
        currentLine,
        currentStations
      ),
    });

    currentLine = step.lineId;

    currentStations = [step.station];
  }

  // --------------------------------------------------
  // Last section
  // --------------------------------------------------

  sections.push({
    lineId: currentLine,
    stations: currentStations,
    direction: getDirection(
      currentLine,
      currentStations
    ),
  });

  return {
    sections,
    changes,
    totalStations: path.length,
    totalChanges: changes.length,
  };
}

// ======================================================
// Direction
// ======================================================

function getDirection(
  lineId: number,
  stations: string[]
): string {
  const line = metroLines.find(
    (item) => item.id === lineId
  );

  if (!line || stations.length === 0) {
    return "";
  }

  const firstStation = stations[0];
  const lastStation =
    stations[stations.length - 1];

  // پیدا کردن مسیری که این بخش از مسیر داخل آن قرار دارد
  const path = line.paths.find((item) => {
    const firstIndex =
      item.stations.indexOf(firstStation);

    const lastIndex =
      item.stations.indexOf(lastStation);

    return (
      firstIndex !== -1 &&
      lastIndex !== -1
    );
  });

  if (!path) {
    return "";
  }

  const firstIndex =
    path.stations.indexOf(firstStation);

  const lastIndex =
    path.stations.indexOf(lastStation);

  if (firstIndex === -1 || lastIndex === -1) {
    return "";
  }

  // حرکت رو به جلو در آرایه
  if (lastIndex > firstIndex) {
    return `به سمت ${path.stations[path.stations.length - 1]}`;
  }

  // حرکت رو به عقب در آرایه
  return `به سمت ${path.stations[0]}`;
}