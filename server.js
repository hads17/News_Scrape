var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news", {
  useMongoClient: true
});
require('./routes/htmlRoutes.js')(app);
require('./routes/apiRoutes.js')(app);



app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});