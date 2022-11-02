const express = require("express");
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000

const path = require("path");
//const router = require("./routes/index.js");
const router = require(path.join(__dirname,'routes','index.js'));
const bodyparser = require("body-parser");
const session = require("express-session");

app.use(
  session({
    secret: "cs webdev",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// app.use(express.static("./public"));
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// const myDB = require("./db/MyDB.js");
// const dashurl = path.join(__dirname, "public", "dashboard.html");
// app.get("/dashboard", (req, res) => {
//   res.sendFile(dashurl);
// });
// app.get("/getExercises", async (req, res) => {
//   const exercises = await myDB.getExercises();
//   res.json(exercises);
// });

//Allow us to interact and allow express to use middleware
//we can get request body content
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
