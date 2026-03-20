'use client';

import { useEffect, useState } from 'react';

export default function BeatProfilePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const raw = localStorage.getItem('shadowtrap_session');
        if (!raw) {
          setError('No session found.');
          setLoading(false);
          return;
        }

        const session = JSON.parse(raw);

        const res = await fetch('/api/beat-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(session),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.error);

        setData(json);
      } catch (err) {
        setError('Could not generate beat profile.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Beat Profile</h1>

        {loading && <p>Generating...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {data && (
          <>
            <section className="border border-zinc-700 p-4 rounded-2xl">
              <h2 className="font-semibold mb-2">Atmosphere</h2>
              <p>{data.atmosphere}</p>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl">
              <h2 className="font-semibold mb-2">Energy Curve</h2>
              <p>{data.energy_curve}</p>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl">
              <h2 className="font-semibold mb-2">Vocal Lanes</h2>
              <ul className="list-disc pl-5">
                {data.vocal_lanes.map((lane: string, i: number) => (
                  <li key={i}>{lane}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
