const helpers = require("./helpers.js");
const format = require("string-format");
const dateFormat = require("date-fns/format");

exports.MoonRiseSet = (req, res) => {
  let parameters = {
    date: req.params.date,
    latitude: req.params.latitude,
    longitude: req.params.longitude
  };
  let moonTimes = helpers.findMoonRiseSet(parameters);
  console.log(moonTimes);
  res.json({ rise: moonTimes.rise, set: moonTimes.set });
};

exports.MoonPhase = (req, res) => {
  let moonIllumination = helpers.findMoonIllumination(req.params.date);
  let phase = helpers.moonPhaseAsText(moonIllumination.phase);
  console.log(moonIllumination);
  console.log(phase);
  res.json({ phase: moonIllumination.phase, text: phase });
};

exports.helloGET = (req, res) => {
  res.send("Hello World!");
};

exports.MoonWebhook = (req, res) => {
  let date = req.body.queryResult.parameters["date"];
  let time_period = req.body.queryResult.parameters["time-period"];
  let moon_phase = req.body.queryResult.parameters["moon-phase"];
  let output = "Sorry, I don't know the answer to that.";

  if (date != "") {
    let moonPhase = helpers.findMoonIllumination(date);
    output = format(
      "The moon will be {0} on {1}",
      helpers.moonPhaseAsText(moonPhase.phase),
      dateFormat(date, "dddd MMMM Do YYYY")
    );
  }

  res.json({ fulfillmentText: output }); // Return the results of the weather API to Dialogflow
};
