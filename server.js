if (process.env.NODE_ENV !== "production") {
    require("dotenv").parse()
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 5000;

const apiRouter = require("./routes/api-routes")

app.set("view engine", "ejs");
app.set("views", __dirname + "/views")
app.set("layouts", "layouts/layout");
app.use(expressLayouts)
app.use(express.static("public"));

const mongoose = require("monogoose");
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true })
debug.on("error", error => console.error(error))
debug.once("open", () => console.log("Connected to Mongoose"))

app.use("/", apiRouter)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));