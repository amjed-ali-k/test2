import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const timezones = [
  "Asia/Kolkata",
  "Asia/Qatar",
  "America/Vancouver",
  "America/Dawson_Creek",
  "America/Whitehorse",
  "America/Edmonton",
  "America/Yellowknife",
  "America/Regina",
  "America/Winnipeg",
  "America/Toronto",
  "America/Montreal",
  "America/Moncton",
  "America/Halifax",
  "America/Goose_Bay",
  "America/St_Johns",
];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function formatBytes(a: any, b = 2) {
  if (!+a) return "0 Bytes";
  const c = 0 > b ? 0 : b;
  const d = Math.floor(Math.log(a) / Math.log(1024));
  return `${Number.parseFloat((a / 1024 ** d).toFixed(c))} ${
    ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
}
