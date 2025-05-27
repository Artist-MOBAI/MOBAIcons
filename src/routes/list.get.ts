import { Hono } from "hono";
import { getAvailableIcons } from "../utils/icons";

const router = new Hono();

router.get("/", async (c) => {
  const list = await getAvailableIcons();
  const json = c.req.query("json") !== undefined;
  if (json) {
    return c.json(list);
  } else {
    return c.text(list.join(","));
  }
});

export default router;
