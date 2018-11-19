const fs = require("fs");
const moment = require("moment");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  const log =
    "GET / from " +
    req.connection.remoteAddress +
    " at " +
    moment()
      .utc(7)
      .format("LLLL") +
    "\n";
  fs.appendFileSync("log.txt", log);
  res.send("Hereton dot com apt");
});

app.post("/", function(req, res) {
  const log =
    "POST / from " +
    req.connection.remoteAddress +
    " at " +
    moment()
      .utc(7)
      .format("LLLL") +
    "\n" +
    JSON.stringify(req.body, null, 2) +
    "\n";
  fs.appendFileSync("log.txt", log);
  res.send(req.body);
});

app.get("/log", function(req, res) {
  fs.readFile("log.txt", "utf8", function(err, contents) {
    if (err) {
      res.status(500).send();
    }
    let data = "";
    contents
      .toString()
      .split("\n")
      .forEach(function(line, index, arr) {
        if (index === arr.length - 1 && line === "") {
          return;
        }
        data += index + " " + line + "<br/>";
      });
    res.send(data);
  });
});

const PORT = "44112";

app.listen(PORT, () => {
  console.log("server started at " + PORT);
});
