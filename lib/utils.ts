import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { playlists } from "./data";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const morePlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "a",
  })),
];

export const sidebarPlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "_side",
  })),
];

export const allPlaylists = [
  ...playlists,
  ...morePlaylists,
  ...sidebarPlaylists,
];
