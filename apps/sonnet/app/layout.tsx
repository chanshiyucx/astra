import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Merriweather, Noto_Serif_SC } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Sonnet",
  description: "A quiet place for English notes and daily practice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${notoSerifSC.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
