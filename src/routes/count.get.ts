import { Hono } from "hono";
import { getIconCount } from "../utils/icons";

const router = new Hono();

router.get("/", async (c) => {
  const count = getIconCount();
  return c.text(count.toString());
});

export default router;
