import { HistoryItem } from "@/types";
import { history$ } from "../states/historyState";

export function createHistory(item: HistoryItem) {
  try {
    const prevObj = history$.get() || {};
    const prevArray: HistoryItem[] = Object.values(prevObj);
    const newHistory = [...prevArray, item];
    const newObj = newHistory.reduce((acc, val, index) => {
      acc[index] = val;
      return acc;
    }, {} as Record<string, HistoryItem>);
    history$.set(newObj);
  } catch (error) {
    console.error("Error creating history:", error);
  }
}

export function readHistory(): HistoryItem[] {
  const currentObj = history$.get() || {};
  return Object.values(currentObj);
}
