export type CrossValidationTheme = { theme: string; sources: string[]; strength: number; agreement: 'agree' | 'mixed' | 'conflict'; conflicts: string[] };
export interface CrossValidationEngine { validate(systemResults: Record<string, unknown>): CrossValidationTheme[]; }
export const emptyCrossValidationEngine: CrossValidationEngine = { validate: () => [] };
