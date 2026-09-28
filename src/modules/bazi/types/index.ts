export type Pillar = { stem: string; branch: string; stemElement: string; branchElement: string; yinYang: string; tenGod: string; hiddenStems: string[]; naYin: string };
export type BaziChart = { engine: string; calculatedAt: string; inputLocalTime: string; pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar | null }; solarTerm: string; lunarDate: string; elementCounts: Record<string, number>; unknownBirthTime: boolean };
export type BaziInput = { date: string; time?: string; unknownTime?: boolean; timezone?: string };
