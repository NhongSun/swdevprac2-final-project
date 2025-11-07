import { clsx, type ClassValue } from "clsx";
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
