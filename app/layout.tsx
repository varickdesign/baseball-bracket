import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-jost",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "World Series Bracket Challenge — Bargain Grocery",
  description:
    "Pick every postseason series winner and win a $500 Bargain Grocery gift card. Make your MLB playoff bracket picks now.",
  openGraph: {
    title: "World Series Bracket Challenge — Bargain Grocery",
    description:
      "Pick every postseason series and win a $500 Bargain Grocery gift card.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${inter.variable} min-h-screen bg-white font-body antialiased text-sox-body`}>{children}</body>
    </html>
  );
}
