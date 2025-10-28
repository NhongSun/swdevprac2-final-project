import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/locale-context";
import { UserProvider } from "@/lib/user-context";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import type React from "react";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({ 
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Booth Booking System",
  description: "Exhibition booth booking management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSansThai.className} min-h-dvh flex flex-col`}>
        <UserProvider>
          <LocaleProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Toaster />
          </LocaleProvider>
        </UserProvider>
      </body>
    </html>
  );
}
