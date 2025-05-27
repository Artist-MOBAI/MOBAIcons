import { aliases } from "./aliases";
import iconList from "../data/icon-list.json";

export async function fetchIcons(names?: string[]): Promise<string[]> {
  if (names != null) {
    return Promise.all(
      names.map(async (name) => {
        const icon = iconList.icons.find((icon) => icon.name === name);
        return icon?.svg || "";
      })
    );
  } else {
    return iconList.icons.map((icon) => icon.svg);
  }
}

export function parseQuery(query: string, duplicate = false): string[] {
  if (!/^(?:[a-z0-9\-]+,)+[a-z0-9\-]+|[a-z0-9\-]+$/i.test(query)) {
    throw new Error("Invalid query");
  }

  const words = query
    .toLowerCase()
    .trim()
    .split(",")
    .map((word) => aliases[word] ?? word);
  return duplicate ? words : [...new Set(words)];
}

export function getAvailableIcons(): string[] {
  return iconList.icons.map((icon) => icon.name);
}

export function getIconCount(): number {
  return iconList.totalIcons;
}
