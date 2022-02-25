const dbo = require("./db.js");
//const e = require("express");
const express = require("express");
const path = require("path");
//console.log(dbo);

dbo.set_name();

dbo.getcon();
dbo.cr_tbl(dbo.dbcon);
dbo.seed_tbl(dbo.dbcon);
//console.log(dbo);
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
app.get("/about", (req, res) => {
  res.status(200).render("about");
});

app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"]
  };
  res.status(200).render("data", { model: test });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM Books ORDER BY Title";
  dbo.dbcon.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("books", { model: rows });
  });
});
