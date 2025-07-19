import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InspireGPT - Daily AI Quotes 🚀",
  description: "Get daily inspirational quotes powered by AI ✨. Share, download, and get motivated instantly!",
  openGraph: {
    title: "InspireGPT - Daily AI Quotes 🚀",
    description: "Get daily inspirational quotes powered by AI ✨. Share, download, and get motivated instantly!",
    url: "https://inspire-gpt.vercel.app",
    siteName: "InspireGPT",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "InspireGPT Open Graph Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InspireGPT - Daily AI Quotes 🚀",
    description: "Get daily inspirational quotes powered by AI ✨.",
    images: ["/og.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Toaster richColors position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
