"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Volume2 } from "lucide-react";

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

  const copyQuote = () => {
    navigator.clipboard.writeText(quote);
    toast.success("Quote copied to clipboard! 🚀");
  };

  const handleMoodClick = (m: string) => {
    setMood(m);
    setQuote("");
  };

  return (
    <main className="max-w-lg mx-auto mt-10 p-4 space-y-4">
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

      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          onClick={getQuote}
          disabled={loading}
          className="w-full mb-4"
        >
          {loading ? "Generating..." : "Get Quote"}
        </Button>
      </motion.div>

      {!loading && !quote && (
        <p className="text-center text-muted-foreground mb-2">
          Enter a topic or mood and get inspired! ✨
        </p>
      )}

      {(loading || quote) && (
        <>
          <p className="text-center text-muted-foreground mb-1">Your Quote:</p>

          {loading ? (
            <Card className="animate-pulse bg-gradient-to-r from-gray-700 via-gray-900 to-black h-24 rounded-xl" />
          ) : (
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base sm:text-lg">
              <CardContent className="p-4 text-center font-semibold">{quote}</CardContent>
            </Card>
          )}
        </>
      )}

      {quote && !loading && (
  <>
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(quote);
          toast.success("Quote copied to clipboard! 🚀");
        }}
        className="w-full flex gap-2 justify-center mb-2"
        variant="outline"
      >
        <Copy size={18} /> Copy Quote
      </Button>
    </motion.div>

    <motion.div whileHover={{ scale: 1.05 }}>
      <Button
        onClick={() => {
          if (quote) {
            const utterance = new SpeechSynthesisUtterance(quote);
            utterance.lang = "en-US";
            speechSynthesis.speak(utterance);
            toast("Reading quote aloud 🎧");
          }
        }}
        className="w-full flex gap-2 justify-center"
        variant="outline"
      >
        <Volume2 size={18} /> Listen Quote
      </Button>
    </motion.div>
  </>
      )}
    </main>
  );
}
