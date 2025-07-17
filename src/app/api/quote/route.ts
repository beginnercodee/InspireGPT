import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mood } = await request.json();

  const finalTopic = topic?.trim() || "motivation";
  const finalMood = mood?.trim() || "motivational";

  const prompt = `Give me a short original quote about "${finalTopic}" in a ${finalMood} tone. Keep it under 25 words. Avoid clichés.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env. }`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
      }),
    });

    const data = await response.json();

    // 🟢 Validate OpenAI response
    const quote = data?.choices?.[0]?.message?.content?.trim();

    if (!quote || typeof quote !== "string") {
      console.error("OpenAI returned invalid quote, fallback triggered.", data);
      return NextResponse.json({
        quote: "You are your only limit. Rise above! 🚀",
      });
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json({
      quote: "Your potential is endless. Keep pushing forward! 💫",
    });
  }
}
