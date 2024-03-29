const cors = require("cors");
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
http = require("http");
server = http.createServer(app);
mongoose = require("mongoose");
var usersR = require("./routes/users")
var login = require("./routes/auth")
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
var router = express.Router();

// API routes



app.use("/users", usersR)
app.use("/login", login)




mongoose.connect(process.env.MONGO_URL).then(
  () => {
    app.listen(process.env.PORT || 3000 , function () {
      console.log("Node server running on http://localhost:3000");
    });
  },
  (err) => {
    console.log("Error: connecting to Database. " + err);
  }
);
