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

app.use(express.urlencoded({ extended: false })); // <--- middleware configuration

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
  dbo.set_name();

  dbo.getcon();
  dbo.cr_tbl(dbo.dbcon);
  dbo.seed_tbl(dbo.dbcon);
  dbo.dbcon.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("books2", { model: rows });
  });
});

// GET /edit/5
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Books WHERE Book_ID = ?";
  dbo.dbcon.get(sql, id, (err, row) => {
    // if (err) ...
    res.render("edit", { model: row });
  });
});

// POST /edit/5
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [req.body.Title, req.body.Author, req.body.Comments, id];
  const sql =
    "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE (Book_ID = ?)";
  dbo.dbcon.run(sql, book, (err) => {
    // if (err) ...
    res.redirect("/books");
  });
});

// GET /create
app.get("/create", (req, res) => {
  const book = {
    Author: "Ankuryu Zekko"
  };
  res.render("create", { model: book });
});

// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ?, ?)";
  const book = [req.body.Title, req.body.Author, req.body.Comments];
  dbo.dbcon.run(sql, book, (err) => {
    // if (err) ...
    res.redirect("/books");
  });
});

// GET /delete/5
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Books WHERE Book_ID = ?";
  dbo.dbcon.get(sql, id, (err, row) => {
    // if (err) ...
    res.render("delete", { model: row });
  });
});

// POST /delete/5
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Books WHERE Book_ID = ?";
  dbo.dbcon.run(sql, id, (err) => {
    // if (err) ...
    res.redirect("/books");
  });
});
