import { Hono } from "hono";
import { cache } from "hono/cache";
import { getAvailableIcons } from "../utils/icons";

const router = new Hono();

router.get(
  "/",
  cache({
    cacheControl: "public, max-age=86400",
    cacheName: "mobaicons-data-list",
  }),
  async (c) => {
    const list = await getAvailableIcons();
    const json = c.req.query("json") !== undefined;

    if (json) {
      return c.json(list);
    } else {
      return c.text(list.join(","));
    }
  }
);

export default router;
