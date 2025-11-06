import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/locale-context";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import type React from "react";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Booth Booking System",
  description: "Exhibition booth booking management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${ibmPlexSansThai.className} flex min-h-dvh flex-col`}>
        <NextAuthProvider session={nextAuthSession}>
          <LocaleProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Toaster />
          </LocaleProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
