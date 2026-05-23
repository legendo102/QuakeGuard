
export enum BuildingMaterial {
  ReinforcedConcrete = 'Betonarme',
  Steel = 'Çelik Konstrüksiyon',
  Wood = 'Ahşap',
  Stone = 'Taş / Yığma',
  Adobe = 'Kerpiç'
}

export interface UserProfile {
  name: string;
  surname: string;
  city: string;
  district: string;
  buildingAge: number;
  material: BuildingMaterial;
  isRegistered: boolean;
  notificationsEnabled?: boolean;
}

export type GridCellType = 'empty' | 'wall' | 'window' | 'furniture' | 'safe';

export interface GridCell {
  x: number;
  y: number;
  type: GridCellType;
}

export interface AIAnalysisResult {
  riskPercent: number;
  summary: string;
  recommendations: string[];
}
