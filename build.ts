import fs from "fs/promises";
import path from "path";

type IconMap = Record<string, string>;

const ICONS_DIR = "./icons";
const DIST_DIR = "./dist";
const OUTPUT_FILE = path.join(DIST_DIR, "icons.json");

const files = await fs.readdir(ICONS_DIR);
const icons: IconMap = {};

for (const file of files) {
  if (path.extname(file).toLowerCase() !== ".svg") continue;

  const filePath = path.join(ICONS_DIR, file);
  const content = await fs.readFile(filePath, "utf-8");
  const iconName = path.basename(file, ".svg").toLowerCase();

  icons[iconName] = content;
}

await fs.mkdir(DIST_DIR, { recursive: true });
await fs.writeFile(OUTPUT_FILE, JSON.stringify(icons, null, 2));
