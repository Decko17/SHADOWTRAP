'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type ChorusCard = {
  hook_type: string;
  emotional_tone: string;
  repetition_strategy: string;
  energy_level: string;
  starter_phrases: string[];
};

export default function ChorusForgePage() {
  const [data, setData] = useState<ChorusCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadChoruses() {
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

        const res = await fetch('/api/chorus-forge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ beatProfile, session }),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Request failed');

        setData(json.choruses);
      } catch (err) {
        setError('Could not generate chorus ideas.');
      } finally {
        setLoading(false);
      }
    }

    loadChoruses();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Chorus Forge</h1>

        {loading && <p>Forging hooks...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {data && data.map((chorus, i) => (
          <section key={i} className="border border-zinc-700 p-4 rounded-2xl space-y-2">
            <h2 className="font-semibold text-lg">{chorus.hook_type}</h2>
            <p><span className="font-medium">Tone:</span> {chorus.emotional_tone}</p>
            <p><span className="font-medium">Repetition:</span> {chorus.repetition_strategy}</p>
            <p><span className="font-medium">Energy:</span> {chorus.energy_level}</p>
            <div>
              <p className="font-medium">Starter phrases:</p>
              <ul className="list-disc pl-5">
                {chorus.starter_phrases.map((phrase, idx) => (
                  <li key={idx}>{phrase}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {data && (
          <Link href="/verse-builder" className="block w-full rounded-xl bg-white text-black text-center p-3 font-semibold">
            Next: Verse Builder
          </Link>
        )}
      </div>
    </main>
  );
}
