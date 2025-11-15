"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { bookingApi, getTotalBookedForUserAndExhibition } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { Booking, UpdateBookingInput } from "@/lib/types";
import { formatDateShortMonth } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  CircleChevronDown,
  CircleChevronUp,
  MapPin,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function EditBookingPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { locale } = useLocale();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [totalBooked, setTotalBooked] = useState(0);

  const [formData, setFormData] = useState<UpdateBookingInput>({
    boothType: "small",
    amount: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const token = session?.user?.token ?? "";
  const userRole = session?.user?.role ?? "";
  const userId = session?.user?._id ?? "";
  const bookingId = useMemo(() => {
    const id = params.id;
    return Array.isArray(id) ? id[0] : id;
  }, [params.id]);

  useEffect(() => {
    if (!bookingId || status !== "authenticated") {
      router.back();
      return;
    }
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
          router.push("/bookings");
          return;
        }

        const ownerId =
          typeof data.user === "object" ? data.user._id : data.user;

        const currentIsAdmin = userRole === "admin";
        const currentUserId = userId;

        if (!ownerId && !currentIsAdmin) {
          toast.error(t("common.error", locale), {
            description: t("message.error", locale),
          });
          router.push("/bookings");
          return;
        }

        if (!currentIsAdmin && ownerId && ownerId !== currentUserId) {
          toast.error(t("common.error", locale), {
            description: t("message.notAuthorized", locale),
          });
          router.push("/bookings");
          return;
        }

        setBooking(data);
        setFormData({
          boothType: data.boothType,
          amount: data.amount,
        });

        const exhibitionId =
          typeof data.exhibition === "object"
            ? data.exhibition._id
            : data.exhibition;

        if (exhibitionId && ownerId) {
          const total = await getTotalBookedForUserAndExhibition(
            ownerId,
            exhibitionId,
            token,
          );
          setTotalBooked(Math.max(0, total - data.amount));
        } else {
          setTotalBooked(0);
        }
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
  }, [bookingId, status, token, locale, userRole, userId, router]);

  const maxAllowed = Math.max(0, 6 - totalBooked);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.boothType) {
      newErrors.boothType = t("booking.selectType", locale);
    }

    const amount =
      typeof formData.amount === "string"
        ? Number.parseInt(formData.amount) || 0
        : formData.amount;
    if (amount < 1 || amount > maxAllowed) {
      newErrors.amount = t("booking.amountRequired", locale, {
        max: maxAllowed.toString(),
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate() || !booking) return;
    if (!token) {
      toast.error(t("common.error", locale), {
        description: t("message.error", locale),
      });
      return;
    }

    try {
      setSubmitting(true);
      await bookingApi.update(booking._id, formData, token);
      toast.success(t("common.success", locale), {
        description: t("message.bookingUpdated", locale),
      });
      router.push(`/bookings/${booking._id}`);
    } catch (error) {
      console.error("Failed to update booking:", error);
      toast.error(t("common.error", locale), {
        description:
          error instanceof Error ? error.message : t("message.error", locale),
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || status === "loading") {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Skeleton className="mb-6 h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="mb-2 h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  const exhibition =
    typeof booking.exhibition === "object" ? booking.exhibition : null;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href={`/bookings/${booking._id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back", locale)}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("booking.edit", locale)}
          </CardTitle>
          {userRole !== "admin" && (
            <CardDescription>
              {t("booking.remaining", locale, {
                count: totalBooked.toString(),
              })}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exhibition Info */}
            {exhibition && (
              <div className="space-y-2">
                <Label>{t("booking.exhibition", locale)}</Label>
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
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="bg-muted rounded-md p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <CircleChevronDown className="h-4 w-4" />
                          <span className="text-xs font-semibold uppercase">
                            {t("exhibition.smallBoothQuota", locale)}
                          </span>
                        </div>
                        <p className="text-lg font-bold">
                          {exhibition.smallBoothQuota}
                        </p>
                      </div>
                      <div className="bg-muted rounded-md p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <CircleChevronUp className="h-4 w-4" />
                          <span className="text-xs font-semibold uppercase">
                            {t("exhibition.bigBoothQuota", locale)}
                          </span>
                        </div>
                        <p className="text-lg font-bold">
                          {exhibition.bigBoothQuota}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Booth Type */}
            <div className="space-y-3">
              <Label htmlFor="boothType">
                {t("booking.boothType", locale)}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.boothType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    boothType: value as "small" | "big",
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small" className="cursor-pointer font-normal">
                    {t("booking.boothType.small", locale)}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="big" id="big" />
                  <Label htmlFor="big" className="cursor-pointer font-normal">
                    {t("booking.boothType.big", locale)}
                  </Label>
                </div>
              </RadioGroup>
              {errors.boothType && (
                <p className="text-destructive text-sm">{errors.boothType}</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">
                {t("booking.amount", locale)}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="amount"
                type="number"
                min={1}
                max={maxAllowed}
                value={formData.amount === "" ? "" : String(formData.amount)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount:
                      e.target.value === ""
                        ? ""
                        : Number.parseInt(e.target.value) || 1,
                  })
                }
              />
              {errors.amount && (
                <p className="text-destructive text-sm">{errors.amount}</p>
              )}
              {userRole !== "admin" && (
                <p className="text-muted-foreground text-sm">
                  {t("booking.remaining", locale, {
                    count: totalBooked.toString(),
                  })}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                {t("booking.cancel", locale)}
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting
                  ? t("common.loading", locale)
                  : t("common.save", locale)}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
