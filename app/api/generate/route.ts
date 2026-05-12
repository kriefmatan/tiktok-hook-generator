import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { ageGroup, practiceLength, focus, level } = body;

    const prompt = `
const prompt = `
You are an elite basketball coach.

Create a SHORT and PRACTICAL basketball practice plan.

Age Group: ${ageGroup}
Practice Length: ${practiceLength}
Skill Focus: ${focus}
Team Level: ${level}

IMPORTANT:
- Keep it concise
- No long explanations
- No essays
- Make it easy to scan quickly
- Use short bullet points
- Include timing for each section

Format example:

Warmup — 10 min
• Dynamic stretching
• Ball handling

Defense Drill — 20 min
• Shell drill
• Closeout drill

Team Play — 20 min
• 5v5 transition defense
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