const { app } = require("webfunc");
const handlers = require("./handler.js");

// ROUTES FOR OUR API
app.get("/api/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});
app.get("/api/moon/times/:latitude/:longitude/:date", handlers.MoonRiseSet);
app.get("/api/moon/phase/:date", handlers.MoonPhase);

// START THE SERVER
// =============================================================================
if (require.main === module) {
  var port = process.env.PORT || 5000; // set our port
  app.listen(port); // Run Express.js-like if called directly
} else {
  eval(app.listen("app", 0)); // Expose handler as "export.handler"
}
