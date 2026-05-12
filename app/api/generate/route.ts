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
Length: ${practiceLength}
Focus: ${focus}
Level: ${level}

Return ONLY valid JSON.

Example format:

[
  {
    "title": "Warmup",
    "duration": "10 min",
    "drill": "Dynamic stretching and light jogging with basketballs",
    "focus": "Mobility and ball handling"
  },
  {
    "title": "Rebounding Fundamentals",
    "duration": "20 min",
    "drill": "Box-out positioning drills and jumping for rebounds",
    "focus": "Rebounding technique"
  }
]
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a basketball coach AI. Return ONLY clean JSON arrays.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content || "[]";

    console.log(raw);

    const drills = JSON.parse(raw);

    return Response.json({ drills });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        drills: [
          {
            title: "Error",
            duration: "0 min",
            drill: "Something went wrong",
            focus: "API Error",
          },
        ],
      },
      { status: 200 }
    );
  }
}