import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn-and-practice-typing-platform.vercel.app"),
  title: {
    default: "Learn & Practice Typing Platform",
    template: "%s | Typing Platform",
  },
  description:
    "A modern typing practice platform to improve your WPM, accuracy, and typing skills with real-time feedback.",
  keywords: [
    "typing",
    "practice",
    "WPM",
    "typing speed",
    "accuracy",
    "typing lessons",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learn-and-practice-typing-platform.vercel.app",
    title: "Learn & Practice Typing Platform",
    description:
      "Improve your typing speed and accuracy with our interactive typing platform.",
    siteName: "Typing Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn & Practice Typing Platform",
    description:
      "Improve your typing speed and accuracy with our interactive typing platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://learn-and-practice-typing-platform.vercel.app" />
      </head>
      <body className="dark bg-black text-white">
        {children}
      </body>
    </html>
  );
}
