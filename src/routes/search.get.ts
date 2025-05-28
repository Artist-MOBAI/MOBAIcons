import { Hono } from "hono";
import { fetchIcons, getAvailableIcons } from "../utils/icons";
import { generateSvgGrid } from "../utils/svg";

const router = new Hono();

router.get("/", async (c) => {
  const q = c.req.query("q");

  const availableIcons = await getAvailableIcons();

  if (q) {
    const filteredIcons = availableIcons.filter((iconName) =>
      iconName.toLowerCase().includes(q.toLowerCase())
    );

    return c.json(filteredIcons);
  }
});

router.get("/:name", async (c) => {
  const name = c.req.param("name");
  const perline = parseInt(c.req.query("perline") || "15");

  const availableIcons = await getAvailableIcons();

  if (name) {
    const filteredIconNames = availableIcons.filter((iconName) =>
      iconName.toLowerCase().includes(name.toLowerCase())
    );
    const icons = await fetchIcons(filteredIconNames);
    const svg = generateSvgGrid(icons, { perline });

    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
    });
  }
});

export default router;
