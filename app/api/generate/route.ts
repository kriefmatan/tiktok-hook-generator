import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { age, practiceLength, focus, level } = body;

    const prompt = `
Create a basketball practice plan.

Age: ${age}
Practice Length: ${practiceLength}
Skill Focus: ${focus}
Team Level: ${level}

Return ONLY valid JSON in this exact format:

[
  {
    "title": "Warmup",
    "duration": "10 min",
    "drill": "Dynamic stretching and layups",
    "focus": "Mobility"
  },
  {
    "title": "Defense Drill",
    "duration": "15 min",
    "drill": "Closeout and help-side rotations",
    "focus": "Defense"
  }
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an elite basketball coach. Always return clean JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content || "[]";

    const drills = JSON.parse(raw);

    return Response.json({ drills });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}