export interface MetroPath {
  name: string;
  stations: string[];
}

export interface MetroLine {
  id: number;
  name: string;
  color: string;
  paths: MetroPath[];
}

export interface MetroStation {
  id: string;
  name: string;
  lineIds: number[];
}

export interface MetroConnection {
  from: string;
  to: string;
  lineId: number;
}

export interface MetroNode {
  station: string;
  lineId: number;
}

export interface MetroEdge {
  node: MetroNode;
  cost: number;
  lineId: number;
}

export interface RouteSection {
  lineId: number;
  stations: string[];
  direction: string;
}

export interface RouteChange {
  station: string;
  fromLine: number;
  toLine: number;
}

export interface RouteResult {
  sections: RouteSection[];
  changes: RouteChange[];
  totalStations: number;
  totalChanges: number;
}