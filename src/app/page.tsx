"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import QuoteCard from "@/components/QuoteCard";
import { motion } from "framer-motion";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const gradients = [
    "from-[#667eea] to-[#764ba2]", // Soft purple-blue
    "from-[#ff9966] to-[#ff5e62]", // Warm orange-red
    "from-[#56ccf2] to-[#2f80ed]", // Fresh blue
    "from-[#43e97b] to-[#38f9d7]", // Aqua green
    "from-[#f7971e] to-[#ffd200]", // Golden sunrise
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
      const hoursPassed =
        (Date.now() - parseInt(savedTime, 10)) / (1000 * 60 * 60);
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "InspireGPT Quote",
          text: quote,
          url: siteUrl,
        });
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
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${gradient} flex justify-center items-center p-4 transition-all duration-500 ease-in-out`}
    >
      <div className="p-[3px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-700">
        <motion.main
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 35px rgba(0,0,0,0.3)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 max-w-lg w-full flex flex-col justify-center p-4 space-y-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center mb-6">InspireGPT 🎉</h1>

          <Button
            className="w-full flex gap-2 justify-center mb-2
    transition-all duration-300 hover:scale-105 active:scale-95
    hover:ring-2 hover:ring-offset-2 hover:ring-white
    hover:shadow-lg hover:text-white"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            Toggle Theme
          </Button>

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
                onClick={() => {
                  setMood(m);
                  setQuote("");
                }}
              >
                {m}
              </Button>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={getQuote}
              disabled={loading}
              className="w-full flex gap-2 justify-center mb-2
      transition-all duration-300
      hover:ring-2 hover:ring-offset-2 hover:ring-white
      hover:shadow-lg hover:text-white"
            >
              {loading ? "Generating..." : "Get Quote"}
            </Button>
          </motion.div>

          {(quote || loading) && (
            <>
              <QuoteCard quote={quote} gradient={gradient} loading={loading} />

              {!loading && (
                <>
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="w-full flex gap-2 justify-center mb-2
    transition-all duration-300 hover:scale-105 active:scale-95
    hover:ring-2 hover:ring-offset-2 hover:ring-white
    hover:shadow-lg hover:text-white"
                  >
                    <Copy size={18} /> Copy Quote
                  </Button>

                  <Button
                    onClick={handleListen}
                    variant="outline"
                    className="w-full flex gap-2 justify-center mb-2
    transition-all duration-300 hover:scale-105 active:scale-95
    hover:ring-2 hover:ring-offset-2 hover:ring-white
    hover:shadow-lg hover:text-white"
                  >
                    <Volume2 size={18} /> Listen Quote
                  </Button>

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="w-full flex gap-2 justify-center mb-2
    transition-all duration-300 hover:scale-105 active:scale-95
    hover:ring-2 hover:ring-offset-2 hover:ring-white
    hover:shadow-lg hover:text-white"
                  >
                    📤 Share Quote
                  </Button>
                </>
              )}
            </>
          )}
        </motion.main>
      </div>
    </div>
  );
}
