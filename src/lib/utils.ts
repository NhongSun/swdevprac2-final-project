import { clsx, type ClassValue } from "clsx";
import { isAfter, isSameDay, startOfDay } from "date-fns";
import { twMerge } from "tailwind-merge";
import type { Locale } from "./i18n";
import { t } from "./i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ExhibitionStatus = "upcoming" | "active" | "past";

export function getExhibitionStatus(
  startDate: string,
  durationDay?: number,
): ExhibitionStatus {
  const start = new Date(startDate);
  const now = new Date();
  const end = new Date(start);
  if (durationDay) {
    end.setDate(end.getDate() + durationDay);
  }

  if (now < start) return "upcoming";
  if (now > end) return "past";
  return "active";
}

/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns true if the URL is valid, false otherwise
 */
export function isValidUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets a safe image URL, returning a placeholder if the URL is invalid
 * @param url - The image URL to validate
 * @param placeholder - Optional placeholder URL (defaults to a data URI for a transparent image)
 * @returns A valid URL string
 */
export function getSafeImageUrl(
  url: string | null | undefined,
  placeholder?: string,
): string {
  const defaultPlaceholder =
    placeholder ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

  if (!url || !isValidUrl(url)) {
    return defaultPlaceholder;
  }

  return url;
}

/**
 * Validates if a start date is today or in the future
 * @param date - The date string to validate (ISO format or date string)
 * @returns true if the date is today or in the future, false otherwise
 */
export function validateStartDateForm(date: string): boolean {
  try {
    const startDate = startOfDay(new Date(date));
    const today = startOfDay(new Date());

    // Return true if start date is today or after today
    return isSameDay(startDate, today) || isAfter(startDate, today);
  } catch {
    // If date parsing fails, return false
    return false;
  }
}

/**
 * Maps month index (0-11) to translation key for month names
 */
const monthKeys: Record<number, string> = {
  0: "month.jan",
  1: "month.feb",
  2: "month.mar",
  3: "month.apr",
  4: "month.may",
  5: "month.jun",
  6: "month.jul",
  7: "month.aug",
  8: "month.sep",
  9: "month.oct",
  10: "month.nov",
  11: "month.dec",
};

/**
 * Formats a date with translated month names
 * @param date - The date string or Date object to format
 * @param locale - The locale to use for translations
 * @param format - Format style: "full" for full month names, "short" for abbreviated (default: "short")
 * @param includeTime - Whether to include time (HH:mm) in the output (default: false)
 * @returns Formatted date string with translated month
 */
export function formatDateWithLocale(
  date: string | Date,
  locale: Locale = "en",
  format: "full" | "short" = "short",
  includeTime: boolean = false,
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const monthKey = `${monthKeys[month]}.${format}`;
  const monthName = t(monthKey, locale);

  let formatted = `${monthName} ${day.toString().padStart(2, "0")}, ${year}`;

  if (includeTime) {
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    formatted += ` ${hours}:${minutes}`;
  }

  return formatted;
}

/**
 * Formats a date with full month name (e.g., "January 08, 2026" or "มกราคม 08, 2026")
 * @param date - The date string or Date object to format
 * @param locale - The locale to use for translations
 * @returns Formatted date string with full translated month
 */
export function formatDateFullMonth(
  date: string | Date,
  locale: Locale = "en",
): string {
  return formatDateWithLocale(date, locale, "full");
}

/**
 * Formats a date with short month name (e.g., "Jan 08, 2026" or "ม.ค. 08, 2026")
 * @param date - The date string or Date object to format
 * @param locale - The locale to use for translations
 * @returns Formatted date string with short translated month
 */
export function formatDateShortMonth(
  date: string | Date,
  locale: Locale = "en",
): string {
  return formatDateWithLocale(date, locale, "short");
}

/**
 * Formats a date with short month name and time (e.g., "Jan 08, 2026 14:30" or "ม.ค. 08, 2026 14:30")
 * @param date - The date string or Date object to format
 * @param locale - The locale to use for translations
 * @returns Formatted date string with short translated month and time
 */
export function formatDateShortMonthWithTime(
  date: string | Date,
  locale: Locale = "en",
): string {
  return formatDateWithLocale(date, locale, "short", true);
}

/**
 * Formats a date with full month name and time (e.g., "January 08, 2026 14:30" or "มกราคม 08, 2026 14:30")
 * @param date - The date string or Date object to format
 * @param locale - The locale to use for translations
 * @returns Formatted date string with full translated month and time
 */
export function formatDateFullMonthWithTime(
  date: string | Date,
  locale: Locale = "en",
): string {
  return formatDateWithLocale(date, locale, "full", true);
}
