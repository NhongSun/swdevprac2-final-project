"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { bookingApi } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { Booking } from "@/lib/types";
import {
  formatDateShortMonth,
  formatDateShortMonthWithTime,
} from "@/lib/utils";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { locale } = useLocale();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const token = session?.user?.token ?? "";
  const isAdmin = session?.user?.role === "admin";
  const bookingId = useMemo(() => {
    const id = params.id;
    return Array.isArray(id) ? id[0] : id;
  }, [params.id]);

  useEffect(() => {
    if (!bookingId || status !== "authenticated") return;
    if (!token) {
      setLoading(false);
      toast.error(t("common.error", locale), {
        description: t("message.error", locale),
      });
      return;
    }

    const loadBooking = async () => {
      try {
        setLoading(true);
        const data = await bookingApi.getById(bookingId, token);
        if (!data) {
          toast.error(t("common.error", locale), {
            description: t("message.notFound", locale),
          });
        }
        setBooking(data);
      } catch (error) {
        console.error("Failed to load booking:", error);
        toast.error(t("common.error", locale), {
          description:
            error instanceof Error ? error.message : t("message.error", locale),
        });
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId, status, token, locale]);

  const handleDelete = useCallback(async () => {
    if (!booking) return;
    if (!token) {
      toast.error(t("common.error", locale), {
        description: t("message.error", locale),
      });
      return;
    }

    try {
      setDeleting(true);
      await bookingApi.delete(booking._id, token);
      toast.success(t("common.success", locale), {
        description: t("message.bookingDeleted", locale),
      });
      router.push("/bookings");
    } catch (error) {
      console.error("Failed to delete booking:", error);
      toast.error(t("common.error", locale), {
        description:
          error instanceof Error ? error.message : t("message.error", locale),
      });
    } finally {
      setDeleting(false);
    }
  }, [booking, token, locale, router]);

  if (loading || status === "loading") {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <Skeleton className="mb-6 h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("message.notFound", locale)}</AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/bookings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back", locale)}
          </Link>
        </Button>
      </div>
    );
  }

  const exhibition =
    typeof booking.exhibition === "object" ? booking.exhibition : null;
  const owner = typeof booking.user === "object" ? booking.user : null;
  const ownerId =
    typeof booking.user === "object" ? booking.user._id : booking.user;
  const canEdit =
    !!session?.user && (isAdmin || (!!ownerId && ownerId === session.user._id));

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/bookings">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back", locale)}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl">
              {t("bookingDetail.title", locale)}
            </CardTitle>
            {canEdit && (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/bookings/${booking._id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("bookings.edit", locale)}
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t("bookings.delete", locale)}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {t("bookingDetail.deleteConfirm", locale)}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t("bookingDetail.deleteWarning", locale)}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        {t("booking.cancel", locale)}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting
                          ? t("common.loading", locale)
                          : t("bookings.delete", locale)}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                {t("bookingDetail.id", locale)}
              </p>
              <p className="font-mono text-sm">{booking._id}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                {t("bookingDetail.boothType", locale)}
              </p>
              <Badge
                className={
                  booking.boothType === "big"
                    ? "bg-sky-600 hover:bg-sky-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }
              >
                {t(`booking.boothType.${booking.boothType}`, locale)}
              </Badge>
            </div>

            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                {t("bookingDetail.amount", locale)}
              </p>
              <p className="text-lg font-semibold">{booking.amount}</p>
            </div>

            {owner && (
              <div>
                <p className="text-muted-foreground mb-1 text-sm">
                  {t("bookingDetail.owner", locale)}
                </p>
                <div>
                  <p className="font-medium">{owner.name}</p>
                  <p className="text-muted-foreground text-sm">{owner.email}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                {t("bookingDetail.createdAt", locale)}
              </p>
              <p>{formatDateShortMonthWithTime(booking.createdAt, locale)}</p>
            </div>

            <div>
              <p className="text-muted-foreground mb-1 text-sm">
                {t("bookingDetail.updatedAt", locale)}
              </p>
              <p>{formatDateShortMonthWithTime(booking.updatedAt, locale)}</p>
            </div>
          </div>

          {exhibition && (
            <div>
              <p className="text-muted-foreground mb-2 text-sm">
                {t("bookingDetail.exhibition", locale)}
              </p>
              <Card className="bg-background pt-0">
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold">{exhibition.name}</h3>
                  <div className="text-muted-foreground flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDateShortMonth(exhibition.startDate, locale)}
                      {exhibition.durationDay &&
                        ` (${exhibition.durationDay} ${t("exhibition.days", locale)})`}
                    </div>
                    {exhibition.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {exhibition.venue}
                      </div>
                    )}
                  </div>
                  <Button asChild variant="link" className="mt-2 px-0">
                    <Link href={`/exhibitions/${exhibition._id}`}>
                      {t("exhibitions.viewDetails", locale)}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
