import { Hono } from "hono";
import { fetchIcons, parseQuery } from "../utils/icons";
import { generateSvgGrid } from "../utils/svg";
import iconList from "../data/icon-list.json";

const router = new Hono();

router.get("/", async (c) => {
  const icons = await fetchIcons();
  const search = c.req.query("q");
  const svg = generateSvgGrid(icons);

  let filteredIcons = iconList.icons;

  if (search) {
    filteredIcons = iconList.icons.filter((icon) =>
      icon.name.toLowerCase().includes(search.toLowerCase())
    );

    return c.json(filteredIcons.map((icon) => icon.name));
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
