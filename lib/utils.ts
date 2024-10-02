import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  if (aiModelFlag?.includes("cohere") || aiModelFlag?.includes("Cohere")) {
    return "#39594D";
  } else if (aiModelFlag?.includes("meta") || aiModelFlag?.includes("Meta")) {
    return "#0668E1";
  } else if (aiModelFlag?.includes("claude") || aiModelFlag?.includes("Claude")) {
    return "#da7756";
  } else {
    return "rgb(107 114 128 )";
  }
};
