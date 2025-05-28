import { Hono } from "hono";
import { cache } from "hono/cache";
import { fetchIcons } from "../utils/icons";
import { generateSvgGrid } from "../utils/svg";

const router = new Hono();

router.get(
  "/",
  cache({
    cacheName: "mobaicons-svg-all",
    cacheControl: "public, max-age=86400",
  }),
  async (c) => {
    const icons = await fetchIcons();
    const svg = generateSvgGrid(icons);

    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
    });
  }
);

export default router;
