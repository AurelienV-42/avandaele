import { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import React from "react";
import "../global.css";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default:
      "Aurélien Vandaële - Freelance React Native Developer & UX/UI Designer",
    template: "%s | Aurélien Vandaële",
  },
  description:
    "Aurélien Vandaële, freelance specializing in React Native development and UX/UI design. Discover innovative mobile and web solutions.",
  metadataBase: new URL("https://avandaele.fr"),
  alternates: {
    canonical: "https://www.avandaele.fr/",
  },
  openGraph: {
    title:
      "Aurélien Vandaële - Freelance React Native Developer & UX/UI Designer",
    description:
      "Aurélien Vandaële, freelance specializing in React Native development and UX/UI design. Explore my portfolio of innovative mobile and web solutions.",
    url: "https://avandaele.fr",
    siteName: "Aurélien Vandaële's Portfolio",
    images: [
      {
        url: "https://avandaele.fr/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
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
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
      </body>
    </html>
  );
}
