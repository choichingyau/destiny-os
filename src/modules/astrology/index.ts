export type Planet = { id: string; longitude: number; latitude?: number; sign?: string; house?: number; retrograde?: boolean };
export type House = { number: number; cuspLongitude: number; sign?: string };
export type Aspect = { planetA: string; planetB: string; type: string; orb: number; applying?: boolean };
export type NatalChart = { kind: 'natal'; calculatedAt: string; inputLocalTime: string; timezone: string; planets: Planet[]; houses: House[]; aspects: Aspect[]; engine: string; status: 'placeholder' | 'calculated' };
export type AstrologyChartKind = 'natal' | 'transit' | 'progression' | 'solarReturn' | 'lunarReturn' | 'synastry' | 'composite';
export function createEmptyNatalChart(inputLocalTime: string, timezone: string): NatalChart { return { kind: 'natal', calculatedAt: new Date().toISOString(), inputLocalTime, timezone, planets: [], houses: [], aspects: [], engine: 'not-configured', status: 'placeholder' }; }
