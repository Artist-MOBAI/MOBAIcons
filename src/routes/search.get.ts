import { Hono } from "hono";
import { fetchIcons } from "../utils/icons";
import { generateSvgGrid } from "../utils/svg";
import iconList from "../data/icon-list.json";

const router = new Hono();

router.get("/", async (c) => {
  const q = c.req.query("q");

  let filteredIcons = iconList.icons;

  if (q) {
    filteredIcons = iconList.icons.filter((icon) =>
      icon.name.toLowerCase().includes(q.toLowerCase())
    );

    return c.json(filteredIcons.map((icon) => icon.name));
  }
});

router.get("/:name", async (c) => {
  const name = c.req.param("name");
  const perline = parseInt(c.req.query("perline") || "15");

  let filteredIcons = iconList.icons;

  if (name) {
    filteredIcons = iconList.icons.filter((icon) =>
      icon.name.toLowerCase().includes(name.toLowerCase())
    );
    const icons = await fetchIcons(filteredIcons.map((icon) => icon.name));
    const svg = generateSvgGrid(icons, { perline });

    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
    });
  }
});

export default router;
