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
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
      }),
    });

    const data = await response.json();

    console.log("OpenAI Response:", JSON.stringify(data, null, 2));

    const quote = data?.choices?.[0]?.message?.content?.trim();

    if (!quote || typeof quote !== "string") {
      console.error("OpenAI returned invalid response, sending fallback quote.", data);
      return NextResponse.json({
        quote: "Your future is created by what you do today, not tomorrow. 🚀",
      });
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("API fetch error:", error);
    return NextResponse.json({
      quote: "Stay positive. You are capable of amazing things! 🌟",
    });
  }
}
