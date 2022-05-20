var express = require("express");
var cors = require("cors");
var app = express();
var jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + "/public"));
var cookieParser = require("cookie-parser");
app.use(cookieParser());
var users = [
  {
    firstname: "praveen",
    username: "praveeng",
    password: "123",
  },
  {
    firstname: "rahul",
    username: "rahulr",
    password: "xyz",
  },
];

app.post("/authenticate", function (req, res) {
  console.log(req.body);
  var x = users.filter((user) => {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      return true;
    }
  });
  if (x.length === 1) {
    //res.cookie("asd", "wer");
    var token = jwt.sign(req.body, "somethingspecial");
    res.send({ msg: "success", token });
  } else {
    res.send({ msg: "failed" });
  }
});
app.get("/", function (req, res) {
  res.send("Hello world");
});
function validate(req, res, next) {
  console.log("validate function called", req.headers.authorization);
  var x = req.headers.authorization;
  console.log(typeof x);
  if (req.headers.authorization != "null") {
    console.log("if called");
    jwt.verify(
      req.headers.authorization,
      "somethingspecial",
      function (err, data) {
        console.log(err);
        console.log(data);
      }
    );
    next();
  } else {
    res.send({ msg: "login first" });
  }
}
app.get("/students", validate, (req, res) => {
  console.log("/students caled");
  res.json(users);
});
app.listen(4500, function () {
  console.log("Server running on 4500");
});
