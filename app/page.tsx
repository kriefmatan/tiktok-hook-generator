"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Basketball Team AI
        </h1>

        <p className="text-gray-400 mb-10">
          Build your team's identity and development system.
        </p>

        {/* Offensive Style */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Offensive Style
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-zinc-900 p-4 rounded-xl">
              Fast Pace
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Motion Offense
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Pick & Roll
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              5-Out
            </button>
          </div>
        </div>

        {/* Defensive Style */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Defensive Style
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-zinc-900 p-4 rounded-xl">
              Pressure Defense
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Switching
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Zone Defense
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Aggressive Defense
            </button>
          </div>
        </div>

        {/* Team Problems */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Team Problems
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-zinc-900 p-4 rounded-xl">
              Turnovers
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Rebounding
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Communication
            </button>

            <button className="bg-zinc-900 p-4 rounded-xl">
              Transition Defense
            </button>
          </div>
        </div>

        {/* Generate */}
        <button className="w-full bg-white text-black font-bold py-4 rounded-xl text-xl mt-10">
          Build Team Development Plan
        </button>

      </div>
    </main>
  );
}