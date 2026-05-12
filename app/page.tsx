"use client";

import { useState } from "react";

export default function Home() {
  const [ageGroup, setAgeGroup] = useState("");
  const [practiceLength, setPracticeLength] = useState("");
  const [focus, setFocus] = useState("");
  const [level, setLevel] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePractice = async () => {
    if (!ageGroup || !practiceLength || !focus || !level) return;

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ageGroup,
          practiceLength,
          focus,
          level,
        }),
      });

      const data = await response.json();

      setPlan(data.plan);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Basketball Coach AI
      </h1>

      <p className="text-zinc-400 mb-10 text-center max-w-2xl">
        Generate complete basketball practices in seconds.
      </p>

      <div className="w-full max-w-2xl space-y-4">
        <input
          type="text"
          placeholder="Age Group (Example: U14)"
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
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
          placeholder="Skill Focus (Example: Defense)"
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

      {plan && (
        <div className="mt-10 w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 whitespace-pre-wrap">
          {plan}
        </div>
      )}
    </main>
  );
}