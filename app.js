const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;
const app = express();

console.log(date);

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  let day = date();
  res.render("list", { listTitle: day, newListItems: items });
});

app.get("/work", function (req, res) {
  let work = "Work";
  res.render("list", { listTitle: work, newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.item;
  workItems.push(item);

  res.redirect("/work");
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(port, function () {
  console.log("started listening on port " + port);
});
