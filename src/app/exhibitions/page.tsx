"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { exhibitionApi } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { Exhibition } from "@/lib/types";
import { cn, formatDateShortMonth } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExhibitionsPage() {
  const { locale } = useLocale();
  const { data: session } = useSession();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const isMember = session?.user?.role === "member";

  useEffect(() => {
    async function loadExhibitions() {
      try {
        const data = await exhibitionApi.getAll();
        setExhibitions(data);
      } catch (error) {
        console.error("Failed to load exhibitions:", error);
      } finally {
        setLoading(false);
      }
    }

    loadExhibitions();
  }, []);

  const getExhibitionStatus = (startDate: string, durationDay?: number) => {
    const start = new Date(startDate);
    const now = new Date();
    const end = new Date(start);
    if (durationDay) {
      end.setDate(end.getDate() + durationDay);
    }

    if (now < start) return "upcoming";
    if (now > end) return "past";
    return "active";
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          {t("exhibitions.title", locale)}
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (exhibitions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Calendar className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
          <h2 className="mb-2 text-2xl font-semibold">
            {t("exhibitions.empty", locale)}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-balance">
        {t("exhibitions.title", locale)}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exhibitions.map((exhibition) => {
          const status = getExhibitionStatus(
            exhibition.startDate,
            exhibition.durationDay,
          );
          const statusColors = {
            upcoming: "outline",
            active: "default",
            past: "secondary",
          } as const;

          // Check if there's no quota left
          const hasNoQuota =
            (exhibition.smallBoothQuota === undefined ||
              exhibition.smallBoothQuota === 0) &&
            (exhibition.bigBoothQuota === undefined ||
              exhibition.bigBoothQuota === 0);

          return (
            <Card key={exhibition._id} className="flex flex-col">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <CardTitle className="text-xl text-balance">
                    {exhibition.name}
                  </CardTitle>
                  <Badge
                    variant={statusColors[status]}
                    className={cn({
                      "bg-green-600 hover:bg-green-700": status === "active",
                      "border-foreground/50": status === "upcoming",
                    })}
                  >
                    {t(`exhibitions.${status}`, locale)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateShortMonth(exhibition.startDate, locale)}
                  {exhibition.durationDay &&
                    ` (${exhibition.durationDay} ${
                      exhibition.durationDay > 1
                        ? t("exhibition.days", locale)
                        : t("exhibition.day", locale)
                    })`}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                {exhibition.venue && (
                  <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    {exhibition.venue}
                  </div>
                )}
                <p className="text-muted-foreground line-clamp-3 text-sm text-pretty">
                  {exhibition.description}
                </p>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/exhibitions/${exhibition._id}`}>
                    {t("exhibitions.viewDetails", locale)}
                  </Link>
                </Button>
                {isMember &&
                  (status !== "upcoming" || hasNoQuota ? (
                    <Button className="flex-1" disabled>
                      {t("exhibitions.bookBooth", locale)}
                    </Button>
                  ) : (
                    <Button asChild className="flex-1">
                      <Link
                        href={`/bookings/new?exhibitionId=${exhibition._id}`}
                      >
                        {t("exhibitions.bookBooth", locale)}
                      </Link>
                    </Button>
                  ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
