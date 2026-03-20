import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-4xl font-bold">ShadowTrap</h1>
        <p className="text-zinc-400">Turn beats into song structure.</p>

        <div className="space-y-3">
          <Link
            href="/new-session"
            className="block rounded-2xl bg-white text-black px-4 py-3 font-medium"
          >
            New Session
          </Link>
        </div>
      </div>
    </main>
  );
}
