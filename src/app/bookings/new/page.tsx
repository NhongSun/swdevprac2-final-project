"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import {
  bookingApi,
  exhibitionApi,
  getTotalBookedForUserAndExhibition,
} from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { CreateBookingInput, Exhibition } from "@/lib/types";
import { formatDateShortMonth } from "@/lib/utils";
import { AlertCircle, ArrowLeft, Calendar, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function NewBookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const token = session?.user?.token ?? "";
  const userId = session?.user?._id ?? "";
  const { locale } = useLocale();

  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [totalBooked, setTotalBooked] = useState(0);

  const [formData, setFormData] = useState<CreateBookingInput>({
    exhibition: "",
    boothType: "small",
    amount: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (status !== "authenticated") {
      router.back();
      return;
    }

    if (!token || !userId) {
      setLoading(false);
      toast.error(t("common.error", locale), {
        description: t("message.error", locale),
      });
      return;
    }

    const exhibitionId = searchParams.get("exhibitionId");
    if (!exhibitionId) {
      router.push("/exhibitions");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [exhibitionData, booked] = await Promise.all([
          exhibitionApi.getById(exhibitionId),
          getTotalBookedForUserAndExhibition(userId, exhibitionId, token),
        ]);

        if (!exhibitionData) {
          toast.error(t("message.notFound", locale), {
            description: t("common.error", locale),
          });
          router.push("/exhibitions");
          return;
        }

        setExhibition(exhibitionData);
        setTotalBooked(booked);
        setFormData((prev) => ({ ...prev, exhibition: exhibitionId }));
      } catch (error) {
        console.error("Failed to load data:", error);
        toast.error(t("common.error", locale), {
          description: t("message.error", locale),
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [status, token, userId, searchParams, router, locale]);

  const maxAllowed = Math.max(0, 6 - totalBooked);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.boothType) {
      newErrors.boothType = t("booking.selectType", locale);
    }

    if (formData.amount < 1 || formData.amount > maxAllowed) {
      newErrors.amount = t("booking.amountRequired", locale, {
        max: maxAllowed.toString(),
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);
      if (!token) {
        throw new Error(t("message.error", locale));
      }
      const booking = await bookingApi.create(formData, token);
      toast.success(t("common.success", locale), {
        description: t("message.bookingCreated", locale),
      });
      router.push(`/bookings/${booking._id}`);
    } catch (error) {
      console.error("Failed to create booking:", error);
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

  if (!exhibition) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/exhibitions">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back", locale)}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("booking.create", locale)}
          </CardTitle>
          <CardDescription>
            {t("booking.remaining", locale, { count: totalBooked.toString() })}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Exhibition Info */}
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
                </CardContent>
              </Card>
            </div>

            {maxAllowed === 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t("booking.maxReached", locale)}
                </AlertDescription>
              </Alert>
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
                disabled={maxAllowed === 0}
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
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: Number.parseInt(e.target.value) || 1,
                  })
                }
                disabled={maxAllowed === 0}
              />
              {errors.amount && (
                <p className="text-destructive text-sm">{errors.amount}</p>
              )}
              <p className="text-muted-foreground text-sm">
                {t("booking.remaining", locale, {
                  count: totalBooked.toString(),
                })}
              </p>
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
              <Button
                type="submit"
                disabled={submitting || maxAllowed === 0}
                className="flex-1"
              >
                {submitting
                  ? t("common.loading", locale)
                  : t("booking.submit", locale)}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewBookingPage() {
  return (
    <Suspense fallback={<NewBookingPageSkeleton />}>
      <NewBookingForm />
    </Suspense>
  );
}

function NewBookingPageSkeleton() {
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
