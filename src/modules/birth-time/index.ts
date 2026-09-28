export type BirthTimeCandidate = { id: string; label: string; score: number | null; evidence: string[] };
export interface BirthTimeCalibration { createCandidates(input: { date: string; timezone: string }): BirthTimeCandidate[]; scoreCandidate(candidate: BirthTimeCandidate, lifeEvents: unknown[]): number; }
export const birthTimeCalibrationPlaceholder: BirthTimeCalibration = { createCandidates: () => [], scoreCandidate: () => 0 };
