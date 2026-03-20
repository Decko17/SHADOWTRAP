'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type FlowCard = {
  name: string;
  cadence: string;
  syllables_per_phrase: string;
  pause_behavior: string;
  stress_pattern: string;
  example_line: string;
};

export default function FlowLabPage() {
  const [data, setData] = useState<FlowCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFlows() {
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

        const res = await fetch('/api/flow-lab', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ beatProfile, session }),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Request failed');

        setData(json.flows);
      } catch (err) {
        setError('Could not generate flow suggestions.');
      } finally {
        setLoading(false);
      }
    }

    loadFlows();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Flow Lab</h1>

        {loading && <p>Generating flows...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {data && data.map((flow, i) => (
          <section key={i} className="border border-zinc-700 p-4 rounded-2xl space-y-2">
            <h2 className="font-semibold text-lg">{flow.name}</h2>
            <p><span className="font-medium">Cadence:</span> {flow.cadence}</p>
            <p><span className="font-medium">Syllables:</span> {flow.syllables_per_phrase}</p>
            <p><span className="font-medium">Pauses:</span> {flow.pause_behavior}</p>
            <p><span className="font-medium">Stress pattern:</span> {flow.stress_pattern}</p>
            <p><span className="font-medium">Example:</span> {flow.example_line}</p>
          </section>
        ))}

        {data && (
          <Link href="/chorus-forge" className="block w-full rounded-xl bg-white text-black text-center p-3 font-semibold">
            Next: Chorus Forge
          </Link>
        )}
      </div>
    </main>
  );
}
