import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { META, CLAUDE, COHERE } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export const randomLatency = (min: number, max: number) =>
  max === undefined ? Math.random() * min : min + Math.random() * (max - min + 1);

export const aiModelColors = (aiModelFlag: string): string => {
  if (aiModelFlag?.includes("cohere") || aiModelFlag?.includes(COHERE)) {
    return "#39594D";
  } else if (aiModelFlag?.includes("meta") || aiModelFlag?.includes(META)) {
    return "#0668E1";
  } else if (aiModelFlag?.includes("claude") || aiModelFlag?.includes(CLAUDE)) {
    return "#da7756";
  } else {
    return "white";
  }
};

export const formatForJSON = (unformattedJson: string) => {
  let formattedJson = unformattedJson
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
  // Remove non-printable and other non-valid JSON characters
  formattedJson = formattedJson.replace(/[\u0000-\u001F]+/g, "");

  return formattedJson;
};

export function formatTime(timeInSeconds: number): string {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = timeInSeconds % 60

  const parts = []
  
  if (hours > 0) {
    parts.push(hours.toString().padStart(2, '0'))
  }
  
  parts.push(minutes.toString().padStart(2, '0'))
  parts.push(seconds.toString().padStart(2, '0'))

  return parts.join(':')
}

