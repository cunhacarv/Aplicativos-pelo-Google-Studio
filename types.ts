
export interface ResistanceLengthEntry {
  id: string;
  length: number;
  resistance: number | null;
}

export interface ResistanceAreaEntry {
  id: string;
  diameter: number; // in mm
  area: number | null;
  resistance: number | null;
}

export interface OhmLawEntry {
  id: number;
  voltage: number;
  current: number | null;
}
