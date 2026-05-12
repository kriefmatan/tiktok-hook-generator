import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { ageGroup, practiceLength, focus, level } = body;

    const prompt = `
You are an elite basketball coach.

Create a detailed basketball practice plan.

Age Group: ${ageGroup}
Practice Length: ${practiceLength}
Skill Focus: ${focus}
Team Level: ${level}

The practice plan should include:
- Warmup
- Skill Development
- Team Drills
- Conditioning
- Coaching Points
- Time breakdown for each section

Make it practical, realistic, and easy for coaches to follow.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional basketball coach with years of experience developing players and practices.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const plan = completion.choices[0].message.content;

    return Response.json({ plan });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}