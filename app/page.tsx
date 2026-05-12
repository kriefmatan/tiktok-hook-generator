"use client";

import { useState } from "react";

type Drill = {
  title: string;
  duration: string;
  drill: string;
  focus: string;
};

export default function Home() {
  const [age, setAge] = useState("");
  const [practiceLength, setPracticeLength] = useState("");
  const [focus, setFocus] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [drills, setDrills] = useState<Drill[]>([]);

  const generatePractice = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age,
          practiceLength,
          focus,
          level,
        }),
      });

      const data = await response.json();

      setDrills(data.drills || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-6xl font-bold mb-4 mt-10">
        Basketball Coach AI
      </h1>

      <p className="text-zinc-400 mb-10">
        Generate complete basketball practices in seconds.
      </p>

      <div className="w-full max-w-2xl space-y-4">
        <input
          type="text"
          placeholder="Team Age (Example: 13)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          type="text"
          placeholder="Practice Length (Example: 90 minutes)"
          value={practiceLength}
          onChange={(e) => setPracticeLength(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          type="text"
          placeholder="Skill Focus (Example: Defense, Rebounding)"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          type="text"
          placeholder="Team Level (Beginner / Intermediate / Advanced)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <button
          onClick={generatePractice}
          className="w-full bg-white text-black py-4 rounded-xl font-bold hover:opacity-80 transition"
        >
          {loading ? "Generating Practice..." : "Generate Practice Plan"}
        </button>
      </div>

      <div className="mt-12 w-full max-w-3xl space-y-6">
        {drills.map((drill, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">
                {drill.title}
              </h2>

              <span className="text-zinc-400">
                {drill.duration}
              </span>
            </div>

            <p className="text-xl mb-4">
              {drill.drill}
            </p>

            <p className="text-zinc-500">
              Focus: {drill.focus}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}