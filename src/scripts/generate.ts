import fs from "node:fs";
import path from "node:path";

export async function generateIconList() {
  const iconsDir = path.join(process.cwd(), "icons");
  const outputFile = path.join(process.cwd(), "src", "data", "list.json");

  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(iconsDir);
  const svgFiles = files.filter((file) => file.endsWith(".svg")).sort();

  const iconData = {
    totalIcons: svgFiles.length,
    generatedAt: new Date().toISOString(),
    icons: svgFiles.map((filename) => {
      const filePath = path.join(iconsDir, filename);

      return {
        name: path.basename(filename, ".svg").toLowerCase(),
        svg: fs.readFileSync(filePath, "utf-8"),
      };
    }),
  };

  fs.writeFileSync(outputFile, JSON.stringify(iconData, null, 2));

  console.log(`scanning directory: ${iconsDir}`);
  console.log(`output file: ${outputFile}`);
  console.log(`total icons: ${iconData.totalIcons}`);
}

generateIconList();
