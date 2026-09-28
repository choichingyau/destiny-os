'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [soon, setSoon] = useState('');
  return <main className="min-h-screen bg-sand text-ink">
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-20">
      <p className="mb-5 text-sm tracking-[.3em] text-jade">DESTINY OS · 天机</p>
      <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">把复杂的命理，整理成清晰的自我观察。</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">以确定性的历法计算为基础，以温和、克制的语言帮助你探索自己。仅供文化研究与娱乐参考。</p>
      <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-2 md:grid-cols-4">
        <button onClick={() => router.push('/birth')} className="rounded-2xl bg-ink px-5 py-5 text-left text-white shadow-lg transition hover:-translate-y-1"><b>探索自己</b><span className="mt-2 block text-sm text-white/65">从出生资料开始</span></button>
        {['两人关系', '问一件事', '未来趋势'].map(item => <button key={item} onClick={() => setSoon(item)} className="rounded-2xl border border-ink/15 bg-white/50 px-5 py-5 text-left transition hover:bg-white"><b>{item}</b><span className="mt-2 block text-sm text-slate-500">Coming Soon</span></button>)}
      </div>
      {soon && <p className="mt-5 text-sm text-copper">「{soon}」将在后续版本开放。</p>}
    </section>
    <footer className="mx-auto max-w-6xl px-6 pb-10 text-sm text-slate-500">计算由程序完成，AI 只负责解释已经计算的数据。</footer>
  </main>;
}
