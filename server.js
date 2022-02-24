const e = require("express");
const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Server started on Port 3000");
});

app.get("/", (req, res) => {
  res.status(200).render("index");
});
