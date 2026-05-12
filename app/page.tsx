"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateHooks = async () => {
    if (!topic) return;

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      setHooks(data.hooks || []);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-6">
        TikTok Hook Generator
      </h1>

      <p className="text-zinc-400 mb-8 text-center max-w-xl">
        Hooks that stop people from scrolling.
      </p>

      <input
        type="text"
        placeholder="What is your video about?"
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
            className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center gap-4"
          >
            <span>{hook}</span>

            <button
              onClick={() => navigator.clipboard.writeText(hook)}
              className="bg-white text-black px-3 py-1 rounded-lg text-sm font-medium hover:opacity-80"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}