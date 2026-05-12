"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateHooks = async () => {
    if (!topic) return;

    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();

    setHooks(data.hooks);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-6">
        TikTok Hook Generator
      </h1>

      <p className="text-zinc-400 mb-8 text-center max-w-xl">
        Generate viral TikTok hooks instantly with AI.
      </p>

      <input
        type="text"
        placeholder="Enter your topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full max-w-md p-4 rounded-xl bg-zinc-900 border border-zinc-700 mb-4"
      />

      <button
        onClick={generateHooks}
        className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
      >
        {loading ? "Generating..." : "Generate Hooks"}
      </button>

      <div className="mt-10 w-full max-w-2xl space-y-4">
        {hooks.map((hook, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
          >
            {hook}
          </div>
        ))}
      </div>
    </main>
  );
}