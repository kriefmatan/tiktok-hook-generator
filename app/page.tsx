"use client";

import { useState } from "react";

export default function Home() {
  const [selectedOffense, setSelectedOffense] = useState("");
  const [selectedDefense, setSelectedDefense] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");

  const buttonStyle = (active: boolean) =>
    active
      ? "bg-white text-black p-4 rounded-xl font-bold"
      : "bg-zinc-900 text-white p-4 rounded-xl";

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
              onClick={() => setSelectedOffense("Fast Pace")}
              className={buttonStyle(selectedOffense === "Fast Pace")}
            >
              Fast Pace
            </button>

            <button
              onClick={() => setSelectedOffense("Motion Offense")}
              className={buttonStyle(selectedOffense === "Motion Offense")}
            >
              Motion Offense
            </button>

            <button
              onClick={() => setSelectedOffense("Pick & Roll")}
              className={buttonStyle(selectedOffense === "Pick & Roll")}
            >
              Pick & Roll
            </button>

            <button
              onClick={() => setSelectedOffense("5-Out")}
              className={buttonStyle(selectedOffense === "5-Out")}
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
              onClick={() => setSelectedDefense("Pressure Defense")}
              className={buttonStyle(selectedDefense === "Pressure Defense")}
            >
              Pressure Defense
            </button>

            <button
              onClick={() => setSelectedDefense("Switching")}
              className={buttonStyle(selectedDefense === "Switching")}
            >
              Switching
            </button>

            <button
              onClick={() => setSelectedDefense("Zone Defense")}
              className={buttonStyle(selectedDefense === "Zone Defense")}
            >
              Zone Defense
            </button>

            <button
              onClick={() => setSelectedDefense("Aggressive Defense")}
              className={buttonStyle(selectedDefense === "Aggressive Defense")}
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
              onClick={() => setSelectedProblem("Turnovers")}
              className={buttonStyle(selectedProblem === "Turnovers")}
            >
              Turnovers
            </button>

            <button
              onClick={() => setSelectedProblem("Rebounding")}
              className={buttonStyle(selectedProblem === "Rebounding")}
            >
              Rebounding
            </button>

            <button
              onClick={() => setSelectedProblem("Communication")}
              className={buttonStyle(selectedProblem === "Communication")}
            >
              Communication
            </button>

            <button
              onClick={() => setSelectedProblem("Transition Defense")}
              className={buttonStyle(selectedProblem === "Transition Defense")}
            >
              Transition Defense
            </button>

          </div>
        </div>

        {/* Current Identity */}
        <div className="bg-zinc-900 p-6 rounded-2xl mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Current Team Identity
          </h2>

          <p className="mb-2">
            Offensive Style: {selectedOffense || "None"}
          </p>

          <p className="mb-2">
            Defensive Style: {selectedDefense || "None"}
          </p>

          <p>
            Main Team Problem: {selectedProblem || "None"}
          </p>
        </div>

        {/* Generate */}
        <button className="w-full bg-white text-black font-bold py-4 rounded-xl text-xl">
          Build Team Development Plan
        </button>

      </div>
    </main>
  );
}