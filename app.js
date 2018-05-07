// app.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const routes = require("./router.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
// =============================================================================
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
