'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type VerseResult = {
  improved_versions: string[];
  pause_marked_version: string;
  syllable_notes: string[];
  section_advice: string;
  next_line: string;
};

export default function VerseBuilderPage() {
  const [data, setData] = useState<VerseResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadVerseHelp() {
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

        const res = await fetch('/api/verse-builder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ beatProfile, session }),
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Request failed');

        setData(json);
      } catch (err) {
        setError('Could not build verse suggestions.');
      } finally {
        setLoading(false);
      }
    }

    loadVerseHelp();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Verse Builder</h1>

        {loading && <p>Sharpening your bars...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {data && (
          <>
            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Improved Versions</h2>
              <ul className="list-disc pl-5 space-y-2">
                {data.improved_versions.map((version, i) => (
                  <li key={i}>{version}</li>
                ))}
              </ul>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Pause-Marked Version</h2>
              <p>{data.pause_marked_version}</p>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Syllable Notes</h2>
              <ul className="list-disc pl-5 space-y-2">
                {data.syllable_notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Section Advice</h2>
              <p>{data.section_advice}</p>
            </section>

            <section className="border border-zinc-700 p-4 rounded-2xl space-y-2">
              <h2 className="font-semibold text-lg">Next Line</h2>
              <p>{data.next_line}</p>
            </section>

            <Link href="/arrangement" className="block w-full rounded-xl bg-white text-black text-center p-3 font-semibold">
              Next: Arrangement
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
