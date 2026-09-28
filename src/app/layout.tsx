import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '天机 Destiny OS', description: '确定性的历法计算与温和的 AI 解读' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
