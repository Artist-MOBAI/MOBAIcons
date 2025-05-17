// import fs from "fs/promises";
// import path from "path";

// type IconMap = Record<string, string>;

// const DIST_DIR = "./dist";
// const ICONS_JSON_FILE = path.join(DIST_DIR, "icons.json");
// const ICONS_PER_ROW = 15;
// const TARGET_ICON_SIZE = 48;
// const SCALE_FACTOR = TARGET_ICON_SIZE / (300 - 44);

// async function loadIcons(): Promise<IconMap> {
//   const jsonContent = await fs.readFile(ICONS_JSON_FILE, "utf-8");
//   return JSON.parse(jsonContent) as IconMap;
// }

// function generateSvg(
//   iconNames: string[],
//   icons: IconMap,
//   iconsPerRow: number = ICONS_PER_ROW
// ): string {
//   const validIcons = iconNames.map((name) => icons[name]);

//   const totalRows = Math.ceil(validIcons.length / iconsPerRow);
//   const totalWidth = iconsPerRow * 300 - 44;
//   const totalHeight = totalRows * 300 - 44;

//   const scaledWidth = totalWidth * SCALE_FACTOR;
//   const scaledHeight = totalHeight * SCALE_FACTOR;

//   const iconElements = validIcons
//     .map((svgContent, index) => {
//       const xPosition = (index % iconsPerRow) * 300;
//       const yPosition = Math.floor(index / iconsPerRow) * 300;

//       return `
//       <g transform="translate(${xPosition}, ${yPosition})">
//         ${svgContent}
//       </g>
//     `;
//     })
//     .join("");

//   return `
//     <svg
//       width="${scaledWidth}"
//       height="${scaledHeight}"
//       viewBox="0 0 ${totalWidth} ${totalHeight}"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       xmlns:xlink="http://www.w3.org/1999/xlink"
//       version="1.1"
//     >
//       ${iconElements}
//     </svg>
//   `;
// }

// export async function createIconGrid(
//   iconNames: string[],
//   outputFilePath: string,
//   iconsPerRow: number = ICONS_PER_ROW
// ): Promise<void> {
//   const allIcons = await loadIcons();
//   const validIconNames = iconNames.filter((name) => name in allIcons).sort();
//   const svgContent = generateSvg(validIconNames, allIcons, iconsPerRow);

//   await fs.writeFile(outputFilePath, svgContent);
//   console.log(outputFilePath);
// }

// export async function run() {
//   try {
//     const iconMap = await loadIcons();
//     const allIconNames = Object.keys(iconMap);

//     await createIconGrid(allIconNames, "./icon-grid.svg");
//     console.log("./icon-grid.svg");
//   } catch (error) {
//     console.error(error instanceof Error ? error.message : String(error));
//     process.exit(1);
//   }
// }

// if (import.meta.main) run();
