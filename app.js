const express = require("express");
const path = require("path");

const app = express();

app.use("/public", express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");

const people = require("./route/people");

app.use("/people", people);

// app.get("/", (req, res) => {
//   res.send("Hi From app / ");
// });

app.get("/:userQuery", (req, res) => {
  res.render("index", {
    data: {
      userQuery: req.params.userQuery,
      searchResults: ["book 1", "book 2", "book 3"],
      loggedIn: true,
      userName: "Admin",
    },
  });
});

app.listen(3000, () => {
  console.log(`Server Running at: http://127.0.0.1:3000`);
});
