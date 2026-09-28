import type { BaziChart } from '../types';
export function formatBazi(chart: BaziChart) { return Object.entries(chart.pillars).map(([name, p]) => `${name}: ${p ? p.stem + p.branch : '未知'}`).join(' · '); }
