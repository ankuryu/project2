const path = require("path");
const sqlite3 = require("sqlite3").verbose();

module.exports = {
  db_name: null,
  set_name: function () {
    this.db_name = ":memory";
    //path.join(__dirname, "data", "apptest.db");
    console.log("DB Name", this.db_name);
  },
  dbcon: null,
  getcon: function () {
    const dbc = new sqlite3.Database(this.db_name, (err) => {
      if (err) {
        console.log("Cannot connect to Database");
        console.error(err.message);
        this.dbcon = null;
      } else {
        this.dbcon = dbc;
        console.log(dbc);
        console.log("Successful connection to the database 'apptest.db'");
      }
    });
  },
  cr_tbl: function (con) {
    console.log("Creating Table");
    const sql_create = `CREATE TABLE IF NOT EXISTS Books (
  Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title VARCHAR(100) NOT NULL,
  Author VARCHAR(100) NOT NULL,
  Comments TEXT
);`;
    console.log(con);
    if (con) {
      con.run(sql_create, (err) => {
        if (err) {
          console.log("Could Not create Table Books");
          return console.error(err.message);
        }
        console.log("Successful creation of the 'Books' table");
      });
    }
  },

  seed_tbl: function (con) {
    // Database seeding
    console.log("Seeding");
    const sql_insert = `INSERT INTO Books (Book_ID, Title, Author, Comments) VALUES
  (1, 'Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
  (2, 'Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
  (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
    if (con) {
      con.run(sql_insert, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Successful creation of 3 books");
      });
    }
  }
};
