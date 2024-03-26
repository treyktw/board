import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#FF0000", // Red
  "#FFA500", // Orange
  "#FFFF00", // Yellow
  "#008000", // Green
  "#0000FF", // Blue
  "#800080", // Purple
  "#FFC0CB", // Pink
  "#000000", // Black
  "#FFFFFF", // White
  "#808080", // Gray
  "#800000", // Maroon
  "#808000", // Olive
  "#008080", // Teal
  "#000080", // Navy
  "#FF6347", // Tomato
  "#FF4500", // OrangeRed
  "#FF8C00", // DarkOrange
  "#FFD700", // Gold
  "#ADFF2F", // GreenYellow
  "#00FFFF", // Aqua
  "#00FF00", // Lime
  "#9370DB", // MediumPurple
  "#DC143C", // Crimson
  "#6A5ACD", // SlateBlue
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
