import { calculateBazi } from '@/modules/bazi/calculator';
import { mockAiProvider } from '@/modules/ai';
import type { BirthInput } from '@/lib/input-normalizer';
export async function buildReport(input: BirthInput) { const bazi = calculateBazi({ date: input.birthDate, time: input.birthTime, unknownTime: input.unknownTime }); const interpretation = await mockAiProvider.interpret({ profile: input, systems: { bazi }, ruleMatches: [] }); return { bazi, interpretation }; }
