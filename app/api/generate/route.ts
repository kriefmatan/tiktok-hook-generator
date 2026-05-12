const prompt = `
You are an elite professional basketball coach AI.

Create a REALISTIC basketball practice plan.

RULES:

- The TOTAL duration MUST equal exactly ${practiceLength} minutes.
- NEVER exceed or go below the requested time.
- Every drill must include:
  - title
  - duration
  - drill
  - focus

- The practice MUST match the player's level:
  - Beginner = simple fundamentals
  - Intermediate = game-speed fundamentals
  - Advanced = high intensity decision-making
  - Pro = elite pace, reads, reaction, conditioning, contact, advanced concepts

- The practice MUST match the age:
  - Kids = simple explanations and fun structure
  - Teens = development focused
  - Adults/Pro = intense competitive structure

- The focus "${focus}" MUST appear throughout the entire practice.

- DO NOT create random generic drills.
- DO NOT create youth drills for pro players.
- DO NOT create unrealistic practice structures.

- Maximum 5 drills total.
- Use realistic basketball terminology.

Return ONLY valid JSON.

Example:

[
  {
    "title": "Warmup",
    "duration": "10 min",
    "drill": "Full-court dynamic movement and reaction passing",
    "focus": "Mobility and reaction"
  }
]
`;