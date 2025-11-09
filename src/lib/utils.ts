import { clsx, type ClassValue } from "clsx";
import { isAfter, isSameDay, startOfDay } from "date-fns";
import { twMerge } from "tailwind-merge";

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
