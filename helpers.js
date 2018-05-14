var sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
var dateParser = require("date-fns/parse");

exports.findMoonRiseSet = input => {
  return sunCalc.getMoonTimes(
    dateParser(input.date),
    input.latitude,
    input.longitude,
    true
  );
};

exports.findMoonIllumination = date => {
  return sunCalc.getMoonIllumination(dateParser(date));
};

exports.moonPhaseAsText = phase => {
  if (phase == 0) {
    return "New Moon";
  } else if (phase < 0.25) {
    return "Waxing Crescent";
  } else if (phase == 0.25) {
    return "First Quarter";
  } else if (phase < 0.5) {
    return "Waxing Gibbous";
  } else if (phase == 0.5) {
    return "Full Moon";
  } else if (phase < 0.75) {
    return "Waning Gibbous";
  } else if (phase == 0.75) {
    return "Last Quarter";
  } else if (phase < 1) {
    return "Waning Crescent";
  }
};
