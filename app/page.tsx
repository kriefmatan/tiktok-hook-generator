"use client";

import { useState } from "react";

export default function Home() {
  const [offense, setOffense] = useState("");
  const [defense, setDefense] = useState("");
  const [problems, setProblems] = useState<string[]>([]);

  const toggleProblem = (problem: string) => {
    if (problems.includes(problem)) {
      setProblems(problems.filter((p) => p !== problem));
    } else {
      setProblems([...problems, problem]);
    }
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

            <button
              onClick={() => setOffense("Fast Pace")}
              className={`p-4 rounded-xl ${
                offense === "Fast Pace"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Fast Pace
            </button>

            <button
              onClick={() => setOffense("Motion Offense")}
              className={`p-4 rounded-xl ${
                offense === "Motion Offense"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Motion Offense
            </button>

            <button
              onClick={() => setOffense("Pick & Roll")}
              className={`p-4 rounded-xl ${
                offense === "Pick & Roll"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Pick & Roll
            </button>

            <button
              onClick={() => setOffense("5-Out")}
              className={`p-4 rounded-xl ${
                offense === "5-Out"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
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

            <button
              onClick={() => setDefense("Pressure Defense")}
              className={`p-4 rounded-xl ${
                defense === "Pressure Defense"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Pressure Defense
            </button>

            <button
              onClick={() => setDefense("Switching")}
              className={`p-4 rounded-xl ${
                defense === "Switching"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Switching
            </button>

            <button
              onClick={() => setDefense("Zone Defense")}
              className={`p-4 rounded-xl ${
                defense === "Zone Defense"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Zone Defense
            </button>

            <button
              onClick={() => setDefense("Aggressive Defense")}
              className={`p-4 rounded-xl ${
                defense === "Aggressive Defense"
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
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

            <button
              onClick={() => toggleProblem("Turnovers")}
              className={`p-4 rounded-xl ${
                problems.includes("Turnovers")
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Turnovers
            </button>

            <button
              onClick={() => toggleProblem("Rebounding")}
              className={`p-4 rounded-xl ${
                problems.includes("Rebounding")
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Rebounding
            </button>

            <button
              onClick={() => toggleProblem("Communication")}
              className={`p-4 rounded-xl ${
                problems.includes("Communication")
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Communication
            </button>

            <button
              onClick={() => toggleProblem("Transition Defense")}
              className={`p-4 rounded-xl ${
                problems.includes("Transition Defense")
                  ? "bg-white text-black"
                  : "bg-zinc-900"
              }`}
            >
              Transition Defense
            </button>

          </div>
        </div>

        {/* Generate */}
        <button className="w-full bg-white text-black font-bold py-4 rounded-xl text-xl">
          Build Team Development Plan
        </button>

      </div>
    </main>
  );
}