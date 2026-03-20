'use client';

import { useEffect, useState } from 'react';

type ArrangementData = {
  section_order: { section: string; bars: number }[];
  energy_flow: string;
  flow_switch_points: string[];
  bridge_advice: string;
  outro_strategy: string;
};

export default function ArrangementPage() {
  const [data, setData] = useState<ArrangementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadArrangement() {
      try {
        const rawProfile = localStorage.getItem('shadowtrap_beat_profile');
        const rawSession = localStorage.getItem('shadowtrap_session');

        if (!rawProfile || !rawSession) {
          setError('Missing beat data.');
          setLoading(false);
          return;
        }

        const beatProfile = JSON.parse(rawProfile);
        const session = JSON.parse(rawSession);

        const res = await fetch('/api/arrangement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ beatProfile, session }),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Request failed');

        setData(json);
      } catch (err) {
        setError('Could not generate arrangement.');
      } finally {
        setLoading(false);
      }
    }

    loadArrangement();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Arrangement</h1>

        {loading && <p>Building your structure...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {data && (
          <>
            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Section Order</h2>
              <ul className="list-disc pl-5 space-y-1">
                {data.section_order.map((item, i) => (
                  <li key={i}>{item.section} - {item.bars} bars</li>
                ))}
              </ul>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Energy Flow</h2>
              <p>{data.energy_flow}</p>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Flow Switch Points</h2>
              <ul className="list-disc pl-5 space-y-1">
                {data.flow_switch_points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Bridge Advice</h2>
              <p>{data.bridge_advice}</p>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Outro Strategy</h2>
              <p>{data.outro_strategy}</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
