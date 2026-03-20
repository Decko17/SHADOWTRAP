'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewSessionPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    youtube_url: '',
    mood: '',
    bpm: '',
    key: '',
    inspiration: '',
    lyrics: '',
  });

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem('shadowtrap_session', JSON.stringify(form));
    router.push('/beat-profile');
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">New Session</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Beat Title" value={form.title} onChange={updateField} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />
          <input name="youtube_url" placeholder="YouTube URL" value={form.youtube_url} onChange={updateField} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />
          <input name="mood" placeholder="Mood" value={form.mood} onChange={updateField} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />
          <input name="bpm" placeholder="BPM" value={form.bpm} onChange={updateField} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />
          <input name="key" placeholder="Key" value={form.key} onChange={updateField} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />
          <input name="inspiration" placeholder="Type Beat / Inspiration" value={form.inspiration} onChange={updateField} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />
          <textarea name="lyrics" placeholder="Paste draft lyrics" value={form.lyrics} onChange={updateField} rows={6} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3" />

          <button type="submit" className="w-full rounded-xl bg-white text-black p-3 font-semibold">
            Analyze Beat
          </button>
        </form>
      </div>
    </main>
  );
}
