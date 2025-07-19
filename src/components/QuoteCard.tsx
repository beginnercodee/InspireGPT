"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function QuoteCard({ quote }: { quote: string }) {
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
      <Card ref={cardRef} className="card text-white">
  <CardContent className="p-6 text-center font-semibold text-xl">
    {quote}
  </CardContent>
</Card>

      <Button onClick={downloadImage} className="w-full mt-4 flex gap-2 justify-center" variant="outline">
        <Download size={18} /> Download Quote Image
      </Button>
    </>
  );
}
