"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeImage } from "@/components/ui/safe-image";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { exhibitionApi } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { CreateExhibitionFormData, Exhibition } from "@/lib/types";
import { validateStartDateForm } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateExhibition() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const { locale } = useLocale();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CreateExhibitionFormData>({
    name: "",
    description: "",
    venue: "",
    startDate: "",
    durationDay: 0,
    smallBoothQuota: 0,
    bigBoothQuota: 0,
    posterPicture: "",
  });

  const loadExhibition = useCallback(async () => {
    try {
      const data = await exhibitionApi.getById(params.id as string);

      if (!data) {
        toast.error(t("common.error", locale), {
          description: t("message.notFound", locale),
        });
        router.push("/exhibitions");
        return;
      }

      setExhibition(data);

      // Format startDate for input (YYYY-MM-DD)
      const startDate = data.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : "";

      setFormData({
        name: data.name || "",
        description: data.description || "",
        venue: data.venue || "",
        startDate: startDate,
        durationDay: data.durationDay || 0,
        smallBoothQuota: data.smallBoothQuota || 0,
        bigBoothQuota: data.bigBoothQuota || 0,
        posterPicture: data.posterPicture || "",
      });
    } catch (error) {
      console.error("Failed to load exhibition:", error);
      toast.error(t("common.error", locale), {
        description: t("message.error", locale),
      });
      router.push("/exhibitions");
    } finally {
      setLoading(false);
    }
  }, [params.id, locale, router]);

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role !== "admin")
    ) {
      router.back();
      return;
    }

    if (status === "authenticated" && session) {
      loadExhibition();
    }
  }, [status, session, router, loadExhibition]);

  if (status === "loading" || loading) {
    return (
      <div className="bg-background min-h-screen px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <Skeleton className="mb-8 h-10 w-64" />
          <Card>
            <CardContent className="pt-6">
              <Skeleton className="mb-6 h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!exhibition || !session) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "durationDay" ||
        name === "smallBoothQuota" ||
        name === "bigBoothQuota"
          ? value === ""
            ? ""
            : Math.max(0, Number.parseInt(value) || 0)
          : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t("exhibition.form.nameRequired", locale);
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = t("exhibition.form.descriptionRequired", locale);
    }

    // Venue validation
    if (!formData.venue.trim()) {
      newErrors.venue = t("exhibition.form.venueRequired", locale);
    }

    // Start date validation
    if (!formData.startDate) {
      newErrors.startDate = t("exhibition.form.startDateRequired", locale);
    } else if (!validateStartDateForm(formData.startDate)) {
      newErrors.startDate = t("exhibition.form.startDateFuture", locale);
    }

    // Duration validation
    const durationDay =
      typeof formData.durationDay === "string"
        ? Number.parseInt(formData.durationDay) || 0
        : formData.durationDay;
    if (durationDay < 1) {
      newErrors.durationDay = t("exhibition.form.durationMinimum", locale);
    }

    // Small booth quota validation
    const smallBoothQuota =
      typeof formData.smallBoothQuota === "string"
        ? Number.parseInt(formData.smallBoothQuota) || 0
        : formData.smallBoothQuota;
    if (smallBoothQuota < 0) {
      newErrors.smallBoothQuota = t(
        "exhibition.form.smallBoothQuotaMinimum",
        locale,
      );
    }

    // Big booth quota validation
    const bigBoothQuota =
      typeof formData.bigBoothQuota === "string"
        ? Number.parseInt(formData.bigBoothQuota) || 0
        : formData.bigBoothQuota;
    if (bigBoothQuota < 0) {
      newErrors.bigBoothQuota = t(
        "exhibition.form.bigBoothQuotaMinimum",
        locale,
      );
    }

    // Poster picture validation
    if (!formData.posterPicture.trim()) {
      newErrors.posterPicture = t("exhibition.form.posterRequired", locale);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(t("exhibition.form.requiredFields", locale));
      return;
    }

    setSubmitting(true);
    try {
      // Convert string values to numbers before submitting
      const submitData = {
        ...formData,
        durationDay:
          typeof formData.durationDay === "string"
            ? Number.parseInt(formData.durationDay) || 0
            : formData.durationDay,
        smallBoothQuota:
          typeof formData.smallBoothQuota === "string"
            ? Number.parseInt(formData.smallBoothQuota) || 0
            : formData.smallBoothQuota,
        bigBoothQuota:
          typeof formData.bigBoothQuota === "string"
            ? Number.parseInt(formData.bigBoothQuota) || 0
            : formData.bigBoothQuota,
      };
      await exhibitionApi.update(
        params.id as string,
        submitData,
        session.user.token,
      );

      toast.success(t("common.success", locale), {
        description: t("message.exhibitionUpdated", locale),
      });
      router.push(`/exhibitions/${params.id}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("message.error", locale),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-background min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href={`/exhibitions/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.back", locale)}
            </Link>
          </Button>
          <h1 className="text-foreground text-3xl font-bold">
            {t("exhibition.edit.title", locale)}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("exhibition.edit.description", locale)}
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-border bg-card border">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {t("exhibition.form.name", locale)}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  {t("exhibition.form.description", locale)}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your exhibition..."
                  rows={4}
                  className={`bg-background placeholder:text-muted-foreground/50 resize-none ${
                    errors.description ? "border-destructive" : ""
                  }`}
                  required
                />
                {errors.description && (
                  <p className="text-destructive text-sm">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Venue */}
              <div className="space-y-2">
                <Label htmlFor="venue" className="text-sm font-medium">
                  {t("exhibition.form.venue", locale)}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className={`${errors.venue ? "border-destructive" : ""}`}
                />
                {errors.venue && (
                  <p className="text-destructive text-sm">{errors.venue}</p>
                )}
              </div>

              {/* Date and Duration Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    {t("exhibition.form.startDate", locale)}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className={`${
                      errors.startDate ? "border-destructive" : ""
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-destructive text-sm">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="durationDay" className="text-sm font-medium">
                    {t("exhibition.form.duration", locale)}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="durationDay"
                    name="durationDay"
                    type="number"
                    min="1"
                    value={formData.durationDay}
                    onChange={handleInputChange}
                    required
                    className={`${
                      errors.durationDay ? "border-destructive" : ""
                    }`}
                  />
                  {errors.durationDay && (
                    <p className="text-destructive text-sm">
                      {errors.durationDay}
                    </p>
                  )}
                </div>
              </div>

              {/* Booth Quotas Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="smallBoothQuota"
                    className="text-sm font-medium"
                  >
                    {t("exhibition.form.smallBoothQuota", locale)}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="smallBoothQuota"
                    name="smallBoothQuota"
                    type="number"
                    min="0"
                    value={formData.smallBoothQuota}
                    onChange={handleInputChange}
                    required
                    className={`${
                      errors.smallBoothQuota ? "border-destructive" : ""
                    }`}
                  />
                  {errors.smallBoothQuota && (
                    <p className="text-destructive text-sm">
                      {errors.smallBoothQuota}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="bigBoothQuota"
                    className="text-sm font-medium"
                  >
                    {t("exhibition.form.bigBoothQuota", locale)}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="bigBoothQuota"
                    name="bigBoothQuota"
                    type="number"
                    min="0"
                    value={formData.bigBoothQuota}
                    onChange={handleInputChange}
                    required
                    className={`${
                      errors.bigBoothQuota ? "border-destructive" : ""
                    }`}
                  />
                  {errors.bigBoothQuota && (
                    <p className="text-destructive text-sm">
                      {errors.bigBoothQuota}
                    </p>
                  )}
                </div>
              </div>

              {/* Poster Picture Upload */}
              <div className="space-y-2">
                <Label htmlFor="posterPicture" className="text-sm font-medium">
                  {t("exhibition.form.image", locale)}
                  <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="posterPicture"
                  name="posterPicture"
                  value={formData.posterPicture}
                  onChange={handleInputChange}
                  placeholder="e.g., https://example.com/poster.jpg"
                  required
                  className={`${
                    errors.posterPicture ? "border-destructive" : ""
                  }`}
                />
                {errors.posterPicture && (
                  <p className="text-destructive text-sm">
                    {errors.posterPicture}
                  </p>
                )}
                {formData.posterPicture && (
                  <div className="border-border relative mt-4 h-40 w-full overflow-hidden rounded-lg border">
                    <SafeImage
                      src={formData.posterPicture}
                      alt="Poster preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={submitting}
                  className="flex-1"
                >
                  {t("exhibition.create.form.cancel", locale)}
                </Button>
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("exhibition.edit.form.submiting", locale)}
                    </>
                  ) : (
                    t("exhibition.edit.form.submit", locale)
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
