import { Hono } from "hono";
import { cache } from "hono/cache";
import { getIconCount } from "../utils/icons";

const router = new Hono();

router.get(
  "/",
  cache({
    cacheControl: "public, max-age=86400",
    cacheName: "mobaicons-data-count",
  }),
  async (c) => {
    const count = await getIconCount();
    return c.text(count.toString());
  }
);

export default router;
