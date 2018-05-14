const express = require("express");
const handlers = require("./handler.js");
const router = express.Router();

// test route to make sure everything is working
//(accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});
router.get("/moon/times/:latitude/:longitude/:date", handlers.MoonRiseSet);
router.get("/moon/phase/:date", handlers.MoonPhase);

module.exports = router;
