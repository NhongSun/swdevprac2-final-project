"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Globe,
  LogIn,
  LogOut,
  Menu,
  User,
  UserCog,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const { data: session } = useSession();

  const navItems = [
    { href: "/exhibitions", label: t("nav.exhibitions", locale) },
    {
      href: "/bookings",
      label: t("nav.myBookings", locale),
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isAdmin = session?.user?.role === "admin";

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

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("gap-2", {
                      "border-orange-500 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300":
                        isAdmin,
                      "bg-transparent": !isAdmin,
                    })}
                  >
                    {isAdmin ? (
                      <UserCog className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">
                      {isAdmin ? "Admin " : ""}
                      {session.user?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("nav.logout", locale)}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("nav.login", locale)}
                  </span>
                </Button>
              </Link>
            )}

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
