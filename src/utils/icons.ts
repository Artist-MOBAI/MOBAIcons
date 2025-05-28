import { aliases } from "./aliases";

let iconListCache: any = null;

async function getIconList() {
  if (!iconListCache) {
    iconListCache = await import("../data/icon-list.json");
  }
  return iconListCache.default || iconListCache;
}

export async function fetchIcons(names?: string[]): Promise<string[]> {
  const iconList = await getIconList();

  if (names != null) {
    return Promise.all(
      names.map(async (name) => {
        const icon = iconList.icons.find((icon: any) => icon.name === name);
        return icon?.svg || "";
      })
    );
  } else {
    return iconList.icons.map((icon: any) => icon.svg);
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

export async function getAvailableIcons(): Promise<string[]> {
  const iconList = await getIconList();
  return iconList.icons.map((icon: any) => icon.name);
}

export async function getIconCount(): Promise<number> {
  const iconList = await getIconList();
  return iconList.totalIcons;
}
