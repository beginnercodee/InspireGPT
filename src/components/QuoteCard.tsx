"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function QuoteCard({ quote, gradient }: { quote: string, gradient: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

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
        transition={{ duration: 0.5 }}
      >
        <Card className={`text-white bg-gradient-to-r ${gradient} rounded-xl p-6 text-center font-semibold text-xl shadow-xl`}>

          <CardContent className="p-6 text-center font-semibold text-xl">
            {quote}
          </CardContent>
        </Card>
      </motion.div>

      <Button
        onClick={downloadImage}
        className="w-full flex gap-2 justify-center mb-2 transition-transform hover:scale-[1.05]"
        variant="outline"
      >
        <Download size={18} /> Download Quote Image
      </Button>
    </>
  );
}
