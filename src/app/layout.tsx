import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/locale-context";
import { getLocaleFromCookies } from "@/lib/i18n";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { cookies } from "next/headers";
import type React from "react";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import "./globals.css";
import NextAuthProvider from "./providers/NextAuthProvider";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans-thai",
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
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const initialLocale = getLocaleFromCookies(cookieHeader);

  return (
    <html lang="en">
      <body className={`${ibmPlexSansThai.variable} font-sans flex min-h-dvh flex-col`}>
        <NextAuthProvider session={nextAuthSession}>
          <LocaleProvider initialLocale={initialLocale}>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Toaster />
          </LocaleProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
