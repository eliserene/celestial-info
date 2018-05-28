const helpers = require("./helpers.js");
const format = require("date-fns/format");

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
  let phase = helpers.moonPhaseOn(req.params.date);
  res.json({ text: phase });
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
    output = `The moon will be ${helpers.moonPhaseOn(date)} on ${format(
      date,
      "dddd MMMM Do YYYY"
    )}`;
  } else if (moon_phase != "") {
    console.log(`moon phase = ${moon_phase}`);
    output = findMoonPhaseOccurance(moon_phase);
  }

  res.json({ fulfillmentText: output }); // Return the results of the weather API to Dialogflow
};

let findMoonPhaseOccurance = function(moonPhase) {
  switch (moonPhase) {
    case "full-moon":
      return `The next full moon will be on ${format(
        helpers.nextMoonPhaseOccurance(new Date(), 0.5),
        "dddd MMMM Do YYYY"
      )}`;
      break;
    case "new-moon":
      return `The next new moon will be on ${format(
        helpers.nextMoonPhaseOccurance(new Date(), 0),
        "dddd MMMM Do YYYY"
      )}`;
      break;
    default:
      return "I don't know when that phase is.";
  }
};
