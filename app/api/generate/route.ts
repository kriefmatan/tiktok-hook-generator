import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { age, practiceLength, focus, level } = body;

    const prompt = `
Create a SHORT basketball practice plan.

Age: ${age}
Practice Length: ${practiceLength}
Skill Focus: ${focus}
Team Level: ${level}

Return ONLY valid JSON.

Example:

[
  {
    "title": "Warmup",
    "duration": "10 min",
    "drill": "Dynamic stretching and layups",
    "focus": "Mobility"
  }
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },

      messages: [
        {
          role: "system",
          content:
            "You are an elite basketball coach. Return ONLY JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content || "{}";

    const parsed = JSON.parse(raw);

    return Response.json({
      drills: parsed.drills || parsed,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        drills: [
          {
            title: "Warmup",
            duration: "10 min",
            drill: "Dynamic stretching and layups",
            focus: "Mobility",
          },
          {
            title: "Defense Drill",
            duration: "15 min",
            drill: "Closeout and rebounding drill",
            focus: "Defense",
          },
        ],
      }
    );
  }
}