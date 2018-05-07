// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
var dateFormater = require("date-fns/format");
var dateParser = require("date-fns/parse");
const handlers = require("./lib/handler.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working
//(accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

// more routes for our API will happen here

router.get("/moon/times/:latitude/:longitude/:date", handlers.MoonRiseSet);

router.get("/moon/phase/:date", handlers.MoonPhase);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
