import { ReviewType } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360; // Map hash → hue (0–360)
  return `hsl(${hue}, 65%, 55%)`; // Vibrant pastel-like colors
}

export function assignColors<T extends { name: string }>(
  data: T[]
): (T & { color: string })[] {
  return data.map((item) => ({
    ...item,
    color: stringToColor(item.name),
  }));
}

export function getUniqueChannels(reviews: ReviewType[]): string[] {
  const channels = reviews.map((r) => r.channel!).filter(Boolean); // remove null/undefined
  return Array.from(new Set(channels));
}