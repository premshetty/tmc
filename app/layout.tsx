import { Navigation } from "@/components/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travel Planner - Plan Your Next Adventure",
  description:
    "Discover and plan your next travel destination with real-time weather updates, local attractions, and comprehensive city information.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    title: "Travel Planner - Plan Your Next Adventure",
    description:
      "Discover and plan your next travel destination with real-time weather updates, local attractions, and comprehensive city information.",
    siteName: "Travel Planner",
    images: [
      {
        url: "./images/logo.png",
        width: 1200,
        height: 630,
        alt: "Travel Planner - Plan Your Next Adventure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Planner - Plan Your Next Adventure",
    description:
      "Discover and plan your next travel destination with real-time weather updates, local attractions, and comprehensive city information.",
    images: [
      {
        url: "./images/logo.png",
        alt: "Travel Planner - Plan Your Next Adventure",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased min-h-screen`}
      >
        <Providers>
          <Navigation />
          <main className="min-h-screen bg-background">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
