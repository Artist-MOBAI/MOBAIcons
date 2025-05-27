import { Hono } from "hono";
import all from "./routes/all.get";
import count from "./routes/count.get";
import icons from "./routes/icons.get";
import list from "./routes/list.get";
import search from "./routes/search.get";

const app = new Hono();

app.get("/", (c) => {
  return c.redirect("https://github.com/Artist-MOBAI/MOBAIcons");
});

app.route("/all", all);
app.route("/count", count);
app.route("/icons", icons).route("/i", icons);
app.route("/list", list);
app.route("/search", search);

export default app;
