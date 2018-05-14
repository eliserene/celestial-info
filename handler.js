const helpers = require("./helpers.js");

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
