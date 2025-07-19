"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import QuoteCard from "@/components/QuoteCard";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const gradients = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-400 to-emerald-500",
    "from-yellow-400 to-orange-500",
    "from-indigo-500 to-purple-500",
  ];
  const [gradient, setGradient] = useState(gradients[0]);
  const { setTheme, theme } = useTheme();

  const [input, setInput] = useState("");
  const [mood, setMood] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGradient(gradients[Math.floor(Math.random() * gradients.length)]);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("daily_quote");
    const savedTime = localStorage.getItem("daily_quote_time");

    if (saved && savedTime) {
      const hoursPassed = (Date.now() - parseInt(savedTime, 10)) / (1000 * 60 * 60);
      if (hoursPassed < 24) return setQuote(saved);
    }

    fetchDailyQuote();
  }, []);

  const fetchDailyQuote = async () => {
    setLoading(true);
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: input.trim() || "motivation",
        mood: mood.trim() || "Motivational",
      }),
    });
    const data = await res.json();
    const finalQuote = data?.quote?.trim() || "Keep going. You are unstoppable! 🚀";
    setQuote(finalQuote);
    localStorage.setItem("daily_quote", finalQuote);
    localStorage.setItem("daily_quote_time", Date.now().toString());
    setLoading(false);
  };

  const getQuote = async () => {
    if (!input && !mood) return;
    setLoading(true);
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: input || "motivation", mood: mood || "Motivational" }),
    });
    const data = await res.json();
    setQuote(data?.quote?.trim() || "Stay positive and keep pushing forward! 💪");
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quote);
    toast.success("Quote copied to clipboard! 🚀");
  };

  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance(quote);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
    toast("Reading quote aloud 🎧");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "InspireGPT Quote", text: quote, url: siteUrl });
        toast.success("Quote shared successfully! 🚀");
      } catch {
        toast.error("Sharing failed 😞");
      }
    } else {
      navigator.clipboard.writeText(quote);
      toast("Copied to clipboard (Share not supported)");
    }
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${gradient} flex justify-center items-center p-4`}>
      <main className="relative z-10 max-w-lg w-full flex flex-col justify-center p-4 space-y-4
  bg-white/30 dark:bg-black/30 border border-white/20 dark:border-black/20 backdrop-blur-xl rounded-xl shadow-2xl">


        <h1 className="text-3xl font-bold text-center mb-6">InspireGPT 🎉</h1>

        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle Theme</Button>

        <Input
          value={input}
          onChange={(e) => { setInput(e.target.value); setQuote(""); }}
          placeholder="Enter topic (e.g., success)"
          className="mb-2 text-sm sm:text-base"
        />

        <p className="text-muted-foreground text-sm mb-1">Choose a mood:</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {["Motivational", "Calm", "Funny", "Sad"].map((m) => (
            <Button key={m} variant={mood === m ? "default" : "outline"} onClick={() => { setMood(m); setQuote(""); }}>
              {m}
            </Button>
          ))}
        </div>

        <Button onClick={getQuote} disabled={loading} className="w-full flex gap-2 justify-center mb-2 hover:scale-[1.05] transition-transform">
          {loading ? "Generating..." : "Get Quote"}
        </Button>

        {(quote || loading) && (
          <>
            <QuoteCard quote={quote} gradient={gradient} loading={loading} />

            {!loading && (
              <>
                <Button onClick={handleCopy} variant="outline" className="w-full flex gap-2 justify-center hover:scale-[1.05] transition-transform">
                  <Copy size={18} /> Copy Quote
                </Button>

                <Button onClick={handleListen} variant="outline" className="w-full flex gap-2 justify-center hover:scale-[1.05] transition-transform">
                  <Volume2 size={18} /> Listen Quote
                </Button>

                <Button onClick={handleShare} variant="outline" className="w-full flex gap-2 justify-center hover:scale-[1.05] transition-transform">
                  📤 Share Quote
                </Button>
              </>
            )}
          </>
        )}

      </main>
    </div>
  );
}
