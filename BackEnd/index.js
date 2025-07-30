const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./db.js");

const route = data.routes;

const PORT = process.env.PORT || 8080;

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is live and Running...");
});

app.get("/route", (req, res) => {
  res.send(route);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started at port: ${PORT}`);
  }
});
