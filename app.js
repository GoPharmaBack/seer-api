var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
http = require("http");
server = http.createServer(app);
mongoose = require("mongoose");
var UserCtrl = require("./controllers/user")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
var router = express.Router();

// API routes
var users = express.Router()

users
    .route("/users")
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.addUser)


app.use("/api", users)




mongoose.connect(process.env.MONGO_URL).then(
  () => {
    app.listen(process.env.PORT || 8080 , function () {
      console.log("Node server running on http://localhost:3000");
    });
  },
  (err) => {
    console.log("Error: connecting to Database. " + err);
  }
);
