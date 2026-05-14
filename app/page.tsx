"use client";

import { useState } from "react";

export default function Home() {
  const [offense, setOffense] = useState("");
  const [defense, setDefense] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const toggleProblem = (problem: string) => {
    if (problems.includes(problem)) {
      setProblems(problems.filter((p) => p !== problem));
    } else {
      setProblems([...problems, problem]);
    }
  };

  const generatePlan = async () => {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offense,
        defense,
        problems,
      }),
    });

    const data = await response.json();

    setResult(data.plan);

    setLoading(false);
  };

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

            {["Fast Pace", "Motion Offense", "Pick & Roll", "5-Out"].map((style) => (
              <button
                key={style}
                onClick={() => setOffense(style)}
                className={`p-4 rounded-xl ${
                  offense === style
                    ? "bg-white text-black"
                    : "bg-zinc-900"
                }`}
              >
                {style}
              </button>
            ))}

          </div>
        </div>

        {/* Defensive Style */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Defensive Style
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {[
              "Pressure Defense",
              "Switching",
              "Zone Defense",
              "Aggressive Defense",
            ].map((style) => (
              <button
                key={style}
                onClick={() => setDefense(style)}
                className={`p-4 rounded-xl ${
                  defense === style
                    ? "bg-white text-black"
                    : "bg-zinc-900"
                }`}
              >
                {style}
              </button>
            ))}

          </div>
        </div>

        {/* Problems */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Team Problems
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {[
              "Turnovers",
              "Rebounding",
              "Communication",
              "Transition Defense",
            ].map((problem) => (
              <button
                key={problem}
                onClick={() => toggleProblem(problem)}
                className={`p-4 rounded-xl ${
                  problems.includes(problem)
                    ? "bg-white text-black"
                    : "bg-zinc-900"
                }`}
              >
                {problem}
              </button>
            ))}

          </div>
        </div>

        {/* Generate */}
        <button
          onClick={generatePlan}
          className="w-full bg-white text-black font-bold py-4 rounded-xl text-xl"
        >
          {loading ? "Building..." : "Build Team Development Plan"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-10 bg-zinc-900 p-6 rounded-xl whitespace-pre-wrap">
            {result}
          </div>
        )}

      </div>
    </main>
  );
}