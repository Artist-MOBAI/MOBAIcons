import { Hono } from "hono";
import { cache } from "hono/cache";

const router = new Hono();

let infoListCache: any = null;

async function getInfoList() {
  if (!infoListCache) {
    infoListCache = await import("../data/about.json");
  }
  return infoListCache;
}

router.get(
  "/",
  cache({
    cacheControl: "public, max-age=86400",
    cacheName: "mobaicons-data-icons",
  }),
  async (c) => {
    const data = await getInfoList();
    const svg = data.about;
    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
    });
  }
);

export default router;
