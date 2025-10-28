import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/locale-context";
import { UserProvider } from "@/lib/user-context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <UserProvider>
          <LocaleProvider>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Toaster />
          </LocaleProvider>
        </UserProvider>
      </body>
    </html>
  );
}
