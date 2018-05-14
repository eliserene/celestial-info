// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const handlers = require("./handler.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// test route to make sure everything is working
//(accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});
router.get("/moon/times/:latitude/:longitude/:date", handlers.MoonRiseSet);
router.get("/moon/phase/:date", handlers.MoonPhase);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
