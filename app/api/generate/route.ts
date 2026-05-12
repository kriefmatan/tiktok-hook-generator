import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.topic;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a viral TikTok hook generator.",
        },
        {
          role: "user",
          content: `Generate 5 EXTREMELY viral TikTok hooks about ${topic}.

Make them:
- short
- emotionally triggering
- curiosity driven
- written like top TikTok creators
- avoid generic wording
- include strong hooks and pattern interrupts

Return ONLY the hooks.`,
        },
      ],
    });

    const text = completion.choices[0].message.content || "";

    const hooks = text
      .split("\n")
      .filter((line) => line.trim() !== "");

    return Response.json({ hooks });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}