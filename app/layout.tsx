import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
