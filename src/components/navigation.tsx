"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { useUser } from "@/lib/user-context";
import { Calendar, Globe, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const { user, switchRole } = useUser();
  const { locale, setLocale } = useLocale();

  const navItems = [
    { href: "/exhibitions", label: t("nav.exhibitions", locale) },
    {
      href: "/bookings",
      label:
        user.role === "admin"
          ? t("nav.allBookings", locale)
          : t("nav.myBookings", locale),
    },
  ];

  return (
    <nav className="bg-card/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex gap-2 text-lg font-semibold">
              <Calendar className="h-6 w-6" />
              <span>BoothBook</span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="font-medium"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocale("en")}>
                  English {locale === "en" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("th")}>
                  ไทย {locale === "th" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Role Switcher (Dev Only) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {t(`role.${user.role}`, locale)}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchRole("member")}>
                  {t("role.member", locale)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchRole("admin")}>
                  {t("role.admin", locale)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
