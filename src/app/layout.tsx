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
  title: "InspireGPT — Daily Motivational Quotes",
  description: "Get a fresh AI-powered quote every day to stay motivated! Choose your mood, listen, copy, or download your favorite quotes instantly.",
  openGraph: {
    title: "InspireGPT — Daily Motivational Quotes",
    description: "Get a fresh AI-powered quote every day to stay motivated! Choose your mood, listen, copy, or download your favorite quotes instantly.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "InspireGPT",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "InspireGPT Quote Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InspireGPT — Daily Motivational Quotes",
    description: "Get a daily dose of AI-powered motivation instantly.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og.png`],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
