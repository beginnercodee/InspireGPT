  "use client";

  import { useState } from "react";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";

  export default function Home() {
    const [input, setInput] = useState("");
    const [mood, setMood] = useState("");
    const [quote, setQuote] = useState("");
    const [loading, setLoading] = useState(false);

    const getQuote = async () => {
      if (!input && !mood) return;
      setLoading(true);
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: input, mood }),
      });
      const data = await res.json();
      setQuote(data.quote);
      setLoading(false);
    };

    return (
      <main className="max-w-lg mx-auto mt-20 p-4">
        <h1 className="text-3xl font-bold text-center mb-6">InspireGPT 🎉</h1>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter topic (e.g., success)"
          className="mb-4"
        />
        <div className="flex gap-2 mb-4">
          {["Motivational", "Calm", "Funny", "Sad"].map((m) => (
            <Button key={m} variant={mood === m ? "default" : "outline"} onClick={() => setMood(m)}>
              {m}
            </Button>
          ))}
        </div>
        <Button onClick={getQuote} disabled={loading} className="w-full mb-4">
  {loading ? "Generating..." : "Get Quote"}
</Button>

<section className="space-y-4">
  {!loading && !quote && (
    <p className="text-muted-foreground text-center">Enter a topic or mood and get inspired! ✨</p>
  )}

  {loading && (
    <Card className="animate-pulse bg-gradient-to-r from-gray-700 via-gray-900 to-black h-24 rounded-xl" />
  )}

  {quote && !loading && (
  <>
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <CardContent className="p-4 text-center text-lg font-semibold">{quote}</CardContent>
    </Card>
    <Button
      onClick={() => {
        navigator.clipboard.writeText(quote);
        import("sonner").then(({ toast }) =>
          toast.success("Quote copied to clipboard! 🚀")
        );
      }}
      className="w-full"
      variant="outline"
    >
      Copy Quote
    </Button>
  </>
)}

</section>

      </main>
    );
  }
