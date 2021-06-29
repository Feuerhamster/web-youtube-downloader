import express, { Application } from "express";
import defaultRoute from "./routes/default";

const app: Application = express();
const port: number = parseInt(process.env.PORT) || 4131;

app.set("views", "views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(defaultRoute);

app.listen(port, () => {
    console.log("App started on port: " + port);
});