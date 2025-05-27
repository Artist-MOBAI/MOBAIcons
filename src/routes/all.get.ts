import { Hono } from "hono";
import { fetchIcons } from "../utils/icons";
import { generateSvgGrid } from "../utils/svg";

const router = new Hono();

router.get("/", async (c) => {
  const icons = await fetchIcons();
  const svg = generateSvgGrid(icons);
  return c.body(svg, 200, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=31536000",
  });
});

export default router;
