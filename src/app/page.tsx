"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import QuoteCard from "@/components/QuoteCard";

export default function Home() {
  const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
  "from-indigo-500 to-purple-500"
];
const [gradient, setGradient] = useState(gradients[0]);

useEffect(() => {
  setGradient(gradients[Math.floor(Math.random() * gradients.length)]);
}, []);


  const [input, setInput] = useState("");
  const [mood, setMood] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Daily Mode with proper fallback
  useEffect(() => {
    const saved = localStorage.getItem("daily_quote");
    const savedTime = localStorage.getItem("daily_quote_time");

    if (saved && savedTime) {
      const now = Date.now();
      const then = parseInt(savedTime, 10);
      const hoursPassed = (now - then) / (1000 * 60 * 60);

      if (hoursPassed < 24) {
        setQuote(saved);
        return;
      }
    }

    fetchDailyQuote();
  }, []);

  const fetchDailyQuote = async () => {
    setLoading(true);

    const topicToSend = input?.trim() || "motivation";
    const moodToSend = mood?.trim() || "Motivational";

    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: topicToSend, mood: moodToSend }),
    });
    const data = await res.json();

    const finalQuote =
      data?.quote?.trim() || "Keep going. You are unstoppable! 🚀";
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
      body: JSON.stringify({
        topic: input || "motivation",
        mood: mood || "Motivational",
      }),
    });
    const data = await res.json();
    setQuote(
      data?.quote?.trim() || "Stay positive and keep pushing forward! 💪"
    );
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

  const handleMoodClick = (m: string) => {
    setMood(m);
    setQuote("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-400 to-purple-500 flex justify-center items-center p-4">
    <main className="relative z-10 max-w-lg w-full flex flex-col justify-center p-4 space-y-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg">


      <h1 className="text-3xl font-bold text-center mb-6">InspireGPT 🎉</h1>

      <Input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setQuote("");
        }}
        placeholder="Enter topic (e.g., success)"
        className="mb-2 text-sm sm:text-base"
      />

      <p className="text-muted-foreground text-sm mb-1">Choose a mood:</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {["Motivational", "Calm", "Funny", "Sad"].map((m) => (
          <Button
            key={m}
            variant={mood === m ? "default" : "outline"}
            onClick={() => handleMoodClick(m)}
          >
            {m}
          </Button>
        ))}
      </div>

      <Button
        onClick={getQuote}
        disabled={loading}
        className="w-full flex gap-2 justify-center mb-2 transition-transform hover:scale-[1.05]"

      >
        {loading ? "Generating..." : "Get Quote"}
      </Button>

      {loading && (
  <Card className="animate-pulse bg-muted rounded-xl min-h-32 flex items-center justify-center shadow-md">
    <CardContent className="p-6 text-center font-semibold text-xl text-muted-foreground">
      Generating your quote...
    </CardContent>
  </Card>
)}


      {!loading && quote && (
        <>
          <p className="text-center text-muted-foreground text-sm mb-2">
            Today’s Quote
          </p>
          <QuoteCard quote={quote} />
          
            <Button
              onClick={handleCopy}
              className="w-full flex gap-2 justify-center mb-2 transition-transform hover:scale-[1.05]"

              variant="outline"
            >
              <Copy size={18} /> Copy Quote
            </Button>
          
            <Button
              onClick={handleListen}
              className="w-full flex gap-2 justify-center mb-2 transition-transform hover:scale-[1.05]"

              variant="outline"
            >
              <Volume2 size={18} /> Listen Quote
            </Button>
        </>
      )}
    </main>
    </div>
  );
}
