"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function QuoteCard({ quote, gradient, loading }: { quote: string, gradient: string, loading?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <div className="bg-muted rounded-xl h-32 animate-pulse flex items-center justify-center text-muted-foreground font-semibold text-xl">
        Loading quote...
      </div>
    );
  }

  const downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement("a");
      link.download = "inspirational-quote.png";
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded! 🚀");
    } catch (error) {
      toast.error("Failed to download image 😞");
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
  key={quote}
  ref={cardRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>

      <Card
  className={`rounded-3xl p-6 text-center font-semibold text-xl shadow-xl 
    bg-white/20 backdrop-blur-lg border border-white/30 transition-all duration-300
    ${gradient} text-white`}
>
  <CardContent className="p-6 text-center font-semibold text-xl">
    {quote}
  </CardContent>
</Card>

    </motion.div>

      <Button
        onClick={downloadImage}
        className="w-full flex gap-2 justify-center mb-2 transition-transform duration-300 hover:scale-105 active:scale-95"
        variant="outline"
      >
        <Download size={18} /> Download Quote Image
      </Button>
    </>
  );
}
