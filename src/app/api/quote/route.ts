import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mood } = await request.json();

  const finalTopic = topic?.trim() || "motivation";
  const finalMood = mood?.trim() || "motivational";

  const prompt = `Give me a short, fresh inspirational quote about "${finalTopic}" in a ${finalMood} tone. Keep it under 25 words. Avoid clichés.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    const quote = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!quote) {
      console.error("Gemini invalid response, fallback triggered.");
      return NextResponse.json({
        quote: "Stay inspired. Every step forward counts! 🚀",
      });
    }

    return NextResponse.json({ quote });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({
      quote: "Believe in yourself. Progress starts with action. 🌟",
    });
  }
}
