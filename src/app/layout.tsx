import type { Metadata } from "next";
import { Geist, Geist_Mono, Boogaloo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const boogaloo = Boogaloo({
  weight: "400",          // Boogaloo only comes in one weight, so this is required
  subsets: ["latin"],
  variable: "--font-boogaloo",
});

export const metadata: Metadata = {
  title: "Jazz Standards Board",
  description: "Vote for the jazz standards everyone should learn next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
