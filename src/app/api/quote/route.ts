import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mood } = await request.json();

  if (!topic && !mood) {
    return NextResponse.json({ error: "Topic or Mood required" }, { status: 400 });
  }

  const prompt = `Give me a short, unique motivational quote about ${topic || mood}. Keep it under 30 words.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    const quote = data.choices?.[0]?.message?.content || "Stay inspired.";

    return NextResponse.json({ quote });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}