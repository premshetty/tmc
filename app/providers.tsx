"use client";

import { Toaster } from "@/components/ui/toaster";
import { SavedCitiesProvider } from "@/context/savedCitiesContext";
import { ThemeProvider } from "next-themes";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SavedCitiesProvider>{children}</SavedCitiesProvider>
      <Toaster />
    </ThemeProvider>
  );
}
