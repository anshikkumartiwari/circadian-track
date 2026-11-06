import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Behavioral Rhythm, Circadian Alignment & Productivity Analytics",
  description: "Personalized behavioral analytics combining smartphone usage, circadian alignment, and predictive productivity evaluation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900">{children}</body>
    </html>
  );
}
