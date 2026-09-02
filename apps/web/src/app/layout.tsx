import type { Metadata } from "next";
import { Geist, Geist_Mono, Ballet } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const ballet = Ballet({
  variable: "--font-ballet",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Formify — Build forms people actually finish.",
    template: "%s | Formify",
  },
  description:
    "Create beautiful, powerful forms without wrestling with complicated builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ballet.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
