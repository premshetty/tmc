import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navigation } from '@/components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel Planner - Plan Your Next Adventure',
  description: 'Discover and plan your next travel destination with real-time weather updates, local attractions, and comprehensive city information.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://travel-planner.com',
    title: 'Travel Planner - Plan Your Next Adventure',
    description: 'Discover and plan your next travel destination with real-time weather updates, local attractions, and comprehensive city information.',
    siteName: 'Travel Planner',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Planner - Plan Your Next Adventure',
    description: 'Discover and plan your next travel destination with real-time weather updates, local attractions, and comprehensive city information.',
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
      <body suppressHydrationWarning className={`${inter.className} antialiased min-h-screen`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen bg-background">{children}</main>
        </Providers>
      </body>
    </html>
  );
}