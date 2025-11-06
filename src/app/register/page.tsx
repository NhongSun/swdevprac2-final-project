"use client";

import userSignup from "@/lib/userSignup";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { signIn } from "next-auth/react";

function RegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    role: "member",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { locale } = useLocale();

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.tel || !/^[0-9]{9,15}$/.test(formData.tel))
      newErrors.tel = "Phone number must contain 9–15 digits.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);

      await userSignup(
        formData.name,
        formData.email,
        formData.password,
        formData.tel,
        formData.role as "member" | "admin",
      );

      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration successful!");
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("common.back", locale)}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("register.title", locale)}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("register.name", locale)}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {t("register.email", locale)}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tel">
                {t("register.tel", locale)}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="tel"
                type="tel"
                value={formData.tel}
                onChange={(e) =>
                  setFormData({ ...formData, tel: e.target.value })
                }
                placeholder="0812345678"
              />
              {errors.tel && (
                <p className="text-destructive text-sm">{errors.tel}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {t("register.password", locale)}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••"
              />
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                {t("register.role", locale)}{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">
                    {t("register.role.member", locale)}
                  </SelectItem>
                  <SelectItem value="admin">
                    {t("register.role.admin", locale)}
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-destructive text-sm">{errors.role}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? t("register.submiting", locale)
                : t("register.submit", locale)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterPageSkeleton />}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterPageSkeleton() {
  return (
    <div className="container mx-auto max-w-md px-4 py-8">
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
