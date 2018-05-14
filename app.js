const { app } = require("webfunc");
const handlers = require("./handler.js");

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
app.get("/api/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});
app.get("/api/moon/times/:latitude/:longitude/:date", handlers.MoonRiseSet);
app.get("/api/moon/phase/:date", handlers.MoonPhase);

// START THE SERVER
// =============================================================================
eval(app.listen("app", port));
