"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookingApi } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { Booking } from "@/lib/types";
import { formatDateShortMonth } from "@/lib/utils";
import { Calendar, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function BookingsPage() {
  const { locale } = useLocale();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const isAdmin = session?.user?.role === "admin";
  const token = session?.user?.token;

  const loadBookings = useCallback(
    async (userToken: string) => {
      try {
        setLoading(true);
        const data = await bookingApi.getAll(userToken);
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings:", error);
        toast.error(t("common.error", locale), {
          description:
            error instanceof Error ? error.message : t("message.error", locale),
        });
      } finally {
        setLoading(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    if (status === "authenticated" && token) {
      loadBookings(token);
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, token, loadBookings]);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!token) {
        toast.error(t("common.error", locale), {
          description: t("message.notAuthorized", locale),
        });
        return;
      }

      try {
        await bookingApi.delete(id, token);
        toast.success(t("common.success", locale), {
          description: t("message.bookingDeleted", locale),
        });
        await loadBookings(token);
      } catch (error) {
        console.error("Failed to delete booking:", error);
        toast.error(t("common.error", locale), {
          description:
            error instanceof Error ? error.message : t("message.error", locale),
        });
      } finally {
        setDeleteId(null);
      }
    },
    [locale, loadBookings, token],
  );

  const filteredBookings = bookings.filter((booking) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const exhibitionName =
      typeof booking.exhibition === "object"
        ? booking.exhibition.name.toLowerCase()
        : "";
    const userEmail =
      typeof booking.user === "object" ? booking.user.email.toLowerCase() : "";

    return (
      booking._id.toLowerCase().includes(query) ||
      exhibitionName.includes(query) ||
      userEmail.includes(query)
    );
  });

  if (loading || status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-6 h-10 w-64" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="mb-2 text-lg font-semibold">
              {t("common.loginRequired", locale)}
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              {t("bookings.loginMessage", locale)}
            </p>
            <Button asChild>
              <Link href="/login">{t("nav.login", locale)}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {t(isAdmin ? "bookings.allTitle" : "bookings.title", locale)}
        </h1>
        {!isAdmin && (
          <Button asChild>
            <Link href="/exhibitions">
              {t("exhibitions.bookBooth", locale)}
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder={t("bookings.search", locale)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
              <h3 className="mb-2 text-lg font-semibold">
                {t("bookings.empty", locale)}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {t("bookings.createFirst", locale)}
              </p>
              {!isAdmin && (
                <Button asChild>
                  <Link href="/exhibitions">
                    {t("exhibitions.bookBooth", locale)}
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("bookings.id", locale)}</TableHead>
                    <TableHead>{t("bookings.exhibition", locale)}</TableHead>
                    {isAdmin && (
                      <TableHead>{t("bookings.owner", locale)}</TableHead>
                    )}
                    <TableHead>{t("bookings.boothType", locale)}</TableHead>
                    <TableHead>{t("bookings.amount", locale)}</TableHead>
                    <TableHead>{t("bookings.createdAt", locale)}</TableHead>
                    <TableHead className="text-right">
                      {t("bookings.actions", locale)}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => {
                    const exhibition =
                      typeof booking.exhibition === "object"
                        ? booking.exhibition
                        : null;
                    const user =
                      typeof booking.user === "object" ? booking.user : null;

                    return (
                      <TableRow key={booking._id}>
                        <TableCell className="font-mono text-sm">
                          {booking._id}
                        </TableCell>
                        <TableCell>
                          {exhibition ? (
                            <Link
                              href={`/exhibitions/${exhibition._id}`}
                              className="hover:underline"
                            >
                              {exhibition.name}
                            </Link>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            {user ? (
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-muted-foreground text-xs">
                                  {user.email}
                                </span>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                        )}
                        <TableCell>
                          <Badge
                            className={
                              booking.boothType === "big"
                                ? "bg-sky-600 hover:bg-sky-700"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }
                          >
                            {t(
                              `booking.boothType.${booking.boothType}`,
                              locale,
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>
                          {formatDateShortMonth(booking.createdAt, locale)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="ghost" size="icon">
                              <Link href={`/bookings/${booking._id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button asChild variant="ghost" size="icon">
                              <Link href={`/bookings/${booking._id}/edit`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(booking._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
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
            <AlertDialogCancel>{t("booking.cancel", locale)}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("bookings.delete", locale)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
