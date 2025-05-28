import { Hono } from "hono";
import { cache } from "hono/cache";
import { getIconCount } from "../utils/icons";

const router = new Hono();

router.get(
  "/",
  cache({
    cacheName: "mobaicons-data-count",
    cacheControl: "public, max-age=86400",
  }),
  async (c) => {
    const count = await getIconCount();
    return c.text(count.toString());
  }
);

export default router;
