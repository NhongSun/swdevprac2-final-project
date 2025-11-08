"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeImage } from "@/components/ui/safe-image";
import { Textarea } from "@/components/ui/textarea";
import { exhibitionApi } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { CreateExhibitionFormData } from "@/lib/types";
import { validateStartDateForm } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateExhibition() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { locale } = useLocale();

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      (session && session.user.role != "admin")
    ) {
      router.back();
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
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
          ? Math.max(0, Number.parseInt(value) || 0)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!session) return;
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.venue.trim() ||
      !formData.startDate
    ) {
      toast.error(t("exhibition.form.requiredFields", locale));
      return;
    }

    if (!validateStartDateForm(formData.startDate)) {
      toast.error(t("exhibition.form.startDateFuture", locale));
      return;
    }

    setLoading(true);
    try {
      await exhibitionApi.create(formData, session.user.token);

      toast.success("Exhibition created successfully!");
      router.push("/exhibitions");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error creating exhibition",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-background min-h-screen px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground text-3xl font-bold">
            {t("exhibition.create.title", locale)}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("exhibition.create.description", locale)}
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
                  className="bg-input"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  {t("exhibition.form.description", locale)}
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your exhibition..."
                  rows={4}
                  className="bg-input resize-none"
                />
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
                  className="bg-input"
                />
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
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="durationDay" className="text-sm font-medium">
                    {t("exhibition.form.duration", locale)}
                  </Label>
                  <Input
                    id="durationDay"
                    name="durationDay"
                    type="number"
                    value={formData.durationDay}
                    onChange={handleInputChange}
                    className="bg-input"
                  />
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
                  </Label>
                  <Input
                    id="smallBoothQuota"
                    name="smallBoothQuota"
                    type="number"
                    value={formData.smallBoothQuota}
                    onChange={handleInputChange}
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="bigBoothQuota"
                    className="text-sm font-medium"
                  >
                    {t("exhibition.form.bigBoothQuota", locale)}
                  </Label>
                  <Input
                    id="bigBoothQuota"
                    name="bigBoothQuota"
                    type="number"
                    value={formData.bigBoothQuota}
                    onChange={handleInputChange}
                    className="bg-input"
                  />
                </div>
              </div>

              {/* Poster Picture Upload */}
              <div className="space-y-2">
                <Label htmlFor="posterPicture" className="text-sm font-medium">
                  {t("exhibition.form.image", locale)}
                </Label>
                <Input
                  id="posterPicture"
                  name="posterPicture"
                  value={formData.posterPicture}
                  onChange={handleInputChange}
                  placeholder="e.g., https://example.com/poster.jpg"
                  className="bg-input"
                />
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
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("exhibition.create.form.submiting", locale)}
                    </>
                  ) : (
                    t("exhibition.create.form.submit", locale)
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                  className="flex-1"
                >
                  {t("exhibition.create.form.cancel", locale)}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
