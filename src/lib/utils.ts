import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  // YYYY-MM-DD -> 2024.06.18
  return iso.split("-").join(".");
}

export function prefixFromCode(code: string) {
  // GB/T 228.1-2010 -> GB
  const m = code.match(/^([A-Z]+)/);
  return m ? m[1] : "—";
}

export function relativeTime(iso: string) {
  const target = new Date(iso).getTime();
  const now = new Date("2026-06-26").getTime();
  const diffDays = Math.floor((target - now) / (1000 * 60 * 60 * 24));
  if (Math.abs(diffDays) < 31) {
    return diffDays >= 0 ? `${diffDays} 天后` : `${-diffDays} 天前`;
  }
  const months = Math.floor(diffDays / 30);
  return months >= 0 ? `${months} 个月后` : `${-months} 个月前`;
}
