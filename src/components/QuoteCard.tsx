"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function QuoteCard({
  quote,
  gradient,
  loading,
}: {
  quote: string;
  gradient: string;
  loading?: boolean;
}) {
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className={`text-white bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-6 text-center font-semibold text-xl`}
        >
          <CardContent className="p-6 text-center font-semibold text-xl">
            {quote}
          </CardContent>
        </Card>
      </motion.div>

      <Button
        onClick={downloadImage}
        className="w-full flex gap-2 justify-center mb-2
    transition-all duration-300 hover:scale-105 active:scale-95
    hover:ring-2 hover:ring-offset-2 hover:ring-white
    hover:shadow-lg hover:text-white"
        variant="outline"
      >
        <Download size={18} /> Download Quote Image
      </Button>
    </>
  );
}
