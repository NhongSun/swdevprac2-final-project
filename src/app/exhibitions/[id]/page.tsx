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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SafeImage } from "@/components/ui/safe-image";
import { Skeleton } from "@/components/ui/skeleton";
import { exhibitionApi } from "@/lib/api";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import type { Exhibition } from "@/lib/types";
import { formatDateFullMonth, getExhibitionStatus } from "@/lib/utils";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  SquarePen,
  Trash2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ExhibitionDetailPage() {
  const params = useParams();
  const { locale } = useLocale();
  const router = useRouter();

  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const isMember = session?.user?.role === "member";

  useEffect(() => {
    async function loadExhibition() {
      try {
        const data = await exhibitionApi.getById(params.id as string);
        setExhibition(data);
      } catch (error) {
        console.error("Failed to load exhibition:", error);
      } finally {
        setLoading(false);
      }
    }

    loadExhibition();
  }, [params.id]);

  const handleDeleteExhibition = async () => {
    if (!session?.user.token || !exhibition) return;

    try {
      setDeleting(true);
      await exhibitionApi.delete(exhibition._id, session.user.token);

      toast.success(t("common.success", locale), {
        description: t("message.exhibitionDeleted", locale),
      });
      router.push("/exhibitions");
    } catch (error) {
      toast.error(t("common.error", locale), {
        description:
          error instanceof Error ? error.message : t("message.error", locale),
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Skeleton className="mb-6 h-10 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="mb-2 h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("message.notFound", locale)}</AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/exhibitions">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("common.back", locale)}
          </Link>
        </Button>
      </div>
    );
  }

  const status = getExhibitionStatus(
    exhibition.startDate,
    exhibition.durationDay,
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/exhibitions">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.back", locale)}
        </Link>
      </Button>

      <Card className="overflow-hidden pt-0!">
        {exhibition.posterPicture && (
          <div className="bg-muted relative aspect-video w-full overflow-hidden">
            <SafeImage
              src={exhibition.posterPicture}
              alt={exhibition.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-3xl text-balance">
                {exhibition.name}
              </CardTitle>
              <CardDescription className="text-base">
                {t("exhibition.details", locale)}
              </CardDescription>
            </div>

            {isAdmin && (
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  className="hover:text-primary cursor-pointer p-0! hover:bg-transparent"
                  onClick={() =>
                    router.push(`/exhibitions/${exhibition._id}/edit`)
                  }
                >
                  <SquarePen />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="cursor-pointer p-0! hover:bg-transparent hover:text-red-800"
                    >
                      <Trash2 color="#b51717" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {t("exhibition.deleteConfirm", locale)}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {t("exhibition.deleteWarning", locale)}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        {t("booking.cancel", locale)}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteExhibition}
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
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="font-medium">{t("exhibition.dates", locale)}</p>
                <p className="text-muted-foreground text-sm">
                  {formatDateFullMonth(exhibition.startDate, locale)}
                </p>
              </div>
            </div>

            {exhibition.durationDay && (
              <div className="flex items-start gap-3">
                <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">
                    {t("exhibition.duration", locale)}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {exhibition.durationDay}{" "}
                    {exhibition.durationDay > 1
                      ? t("exhibition.days", locale)
                      : t("exhibition.day", locale)}
                  </p>
                </div>
              </div>
            )}

            {exhibition.venue && (
              <div className="flex items-start gap-3 md:col-span-2">
                <MapPin className="text-muted-foreground mt-0.5 h-5 w-5" />
                <div>
                  <p className="font-medium">{t("exhibition.venue", locale)}</p>
                  <p className="text-muted-foreground text-sm">
                    {exhibition.venue}
                  </p>
                </div>
              </div>
            )}
          </div>

          {exhibition.description && (
            <div>
              <p className="text-muted-foreground mb-2 text-sm font-medium">
                {t("exhibition.description", locale)}
              </p>
              <p className="text-foreground text-base leading-relaxed">
                {exhibition.description}
              </p>
            </div>
          )}

          {status === "past" && (
            <Alert className="border-amber-400 bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("exhibition.statusPast", locale)}
              </AlertDescription>
            </Alert>
          )}

          {status === "active" && (
            <Alert className="border-amber-400 bg-amber-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("exhibition.statusActive", locale)}
              </AlertDescription>
            </Alert>
          )}

          {isMember && (
            <div className="flex gap-3 pt-4">
              {status !== "upcoming" ? (
                <Button size="lg" className="flex-1" disabled>
                  {t("exhibitions.bookBooth", locale)}
                </Button>
              ) : (
                <Button asChild size="lg" className="flex-1">
                  <Link href={`/bookings/new?exhibitionId=${exhibition._id}`}>
                    {t("exhibitions.bookBooth", locale)}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
