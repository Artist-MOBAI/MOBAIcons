import { Hono } from "hono";
import { fetchIcons, parseQuery, getAvailableIcons } from "../utils/icons";
import { generateSvgGrid } from "../utils/svg";

const router = new Hono();

router.get("/", async (c) => {
  const icons = await fetchIcons();
  const search = c.req.query("q");
  const svg = generateSvgGrid(icons);

  const availableIcons = await getAvailableIcons();

  if (search) {
    const filteredIcons = availableIcons.filter((iconName) =>
      iconName.toLowerCase().includes(search.toLowerCase())
    );

    return c.json(filteredIcons);
  } else {
    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
    });
  }
});

router.get("/:query", async (c) => {
  const query = c.req.param("query");
  const perline = parseInt(c.req.query("perline") || "15");
  const duplicate = c.req.query("duplicate") !== undefined;
  const sort = c.req.query("sort") !== undefined;

  const iconNames = parseQuery(query, duplicate);
  if (sort) iconNames.sort((a, b) => a.localeCompare(b));
  const icons = await fetchIcons(iconNames);
  const svg = generateSvgGrid(icons, { perline });

  return c.body(svg, 200, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "public, max-age=31536000",
  });
});

export default router;
