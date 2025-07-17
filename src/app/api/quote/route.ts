import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mood } = await request.json();

  const finalTopic = topic?.trim() || "motivation";
  const finalMood = mood?.trim() || "motivational";

  const prompt = `Give me a short, fresh, original quote about "${finalTopic}" in a ${finalMood} tone. Keep it under 25 words. Avoid clichés.`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    const quote = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!quote || typeof quote !== "string") {
      console.error("Gemini invalid response, fallback triggered.");
      return NextResponse.json({
        quote: "Believe in yourself, always. 🚀",
      });
    }

    return NextResponse.json({ quote });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({
      quote: "Keep moving forward. You are unstoppable! 🌟",
    });
  }
}
