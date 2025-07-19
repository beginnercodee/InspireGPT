import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(0, 0%, 21%)",
        card: "hsl(0, 0%, 100%)",
        cardForeground: "hsl(0, 0%, 21%)",
        popover: "hsl(0, 0%, 100%)",
        popoverForeground: "hsl(0, 0%, 21%)",
        primary: "hsl(0, 0%, 20%)",
        primaryForeground: "hsl(0, 0%, 98%)",
        secondary: "hsl(0, 0%, 97%)",
        secondaryForeground: "hsl(0, 0%, 20%)",
        muted: "hsl(0, 0%, 97%)",
        mutedForeground: "hsl(0, 0%, 55%)",
        accent: "hsl(0, 0%, 97%)",
        accentForeground: "hsl(0, 0%, 20%)",
        destructive: "hsl(22, 80%, 52%)",
        border: "hsl(0, 0%, 92%)",
        input: "hsl(0, 0%, 92%)",
        ring: "hsl(0, 0%, 71%)",
        chart1: "hsl(41, 62%, 55%)",
        chart2: "hsl(185, 38%, 47%)",
        chart3: "hsl(227, 29%, 37%)",
        chart4: "hsl(84, 58%, 76%)",
        chart5: "hsl(70, 57%, 70%)",
        sidebar: "hsl(0, 0%, 98%)",
        sidebarForeground: "hsl(0, 0%, 21%)",
        sidebarPrimary: "hsl(0, 0%, 20%)",
        sidebarPrimaryForeground: "hsl(0, 0%, 98%)",
        sidebarAccent: "hsl(0, 0%, 97%)",
        sidebarAccentForeground: "hsl(0, 0%, 20%)",
        sidebarBorder: "hsl(0, 0%, 92%)",
        sidebarRing: "hsl(0, 0%, 71%)",
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.875rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
