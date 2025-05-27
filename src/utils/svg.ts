const ICONS_PER_ROW = 15;
const TARGET_ICON_SIZE = 48;
const SCALE_FACTOR = TARGET_ICON_SIZE / (300 - 44);

export function generateSvgGrid(
  icons: string[],
  {
    perline = ICONS_PER_ROW,
  }: {
    perline?: number;
  } = {}
): string {
  const totalRows = Math.ceil(icons.length / perline);
  const totalWidth = perline * 300 - 44;
  const totalHeight = totalRows * 300 - 44;

  const scaledWidth = totalWidth * SCALE_FACTOR;
  const scaledHeight = totalHeight * SCALE_FACTOR;

  const chunks = [
    `<svg 
  width="${scaledWidth}" 
  height="${scaledHeight}" 
  viewBox="0 0 ${totalWidth} ${totalHeight}"
  fill="none" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink" 
  version="1.1"
>`,
  ];

  for (let i = 0; i < icons.length; i++) {
    const xPosition = (i % perline) * 300;
    const yPosition = Math.floor(i / perline) * 300;

    chunks.push(`
  <g transform="translate(${xPosition}, ${yPosition})">
    ${removeViewBox(icons[i])}
  </g>`);
  }

  return `${chunks.join("")}</svg>`;
}

export function removeViewBox(svg: string): string {
  return svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] ?? svg;
}

export function optimizeSvg(svg: string): string {
  return svg.replace(/>\s{0,}</g, "><");
}
