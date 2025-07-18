import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { topic, mood } = await request.json();

  if (!topic && !mood) {
    return NextResponse.json(
      { error: "Topic or Mood required" },
      { status: 400 }
    );
  }

  const prompt = `
  You are an inspiring quote generator. Write a short, original, fresh quote about "${topic || mood}". 
  Keep it under 25 words. Avoid clichés, make it sound modern and relatable.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const quote =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Keep pushing forward, you’re doing great! 🚀";

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      {
        quote: "Stay positive and keep going — every day is progress. 💡",
        error: "Gemini API failed, fallback quote used.",
      },
      { status: 200 }
    );
  }
}
