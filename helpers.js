var sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
var dateParser = require("date-fns/parse");
let addDays = require("date-fns/add_days");
const Iter = require("fl-generators");

let dates = function*(d) {
  let index = 0;
  while (true) yield addDays(d, index++);
};

const findMoonRiseSet = input => {
  return sunCalc.getMoonTimes(
    dateParser(input.date),
    input.latitude,
    input.longitude,
    true
  );
};

const findMoonIllumination = date => {
  return sunCalc.getMoonIllumination(dateParser(date));
};

const moonPhaseOn = date => {
  if (moonPhaseFilter(0)(dateParser(date))) {
    return "New Moon";
  } else if (moonPhaseFilter(0.25)(dateParser(date))) {
    return "Third Quarter";
  } else if (moonPhaseFilter(0.5)(dateParser(date))) {
    return "Full Moon";
  } else if (moonPhaseFilter(0.75)(dateParser(date))) {
    return "First Quarter";
  } else if (moonCresentPhaseFilter(0, 0.25)(dateParser(date))) {
    return "Waxing Crescent";
  } else if (moonCresentPhaseFilter(0.25, 0.5)(dateParser(date))) {
    return "Waxing Gibbous";
  } else if (moonCresentPhaseFilter(0.5, 0.75)(dateParser(date))) {
    return "Waning Gibbous";
  } else if (moonCresentPhaseFilter(0.75, 1)(dateParser(date))) {
    return "Waning Crescent";
  } else {
    return "ERROR";
  }
};

const nextMoonPhaseOccurance = (date, phaseOffset) => {
  return Iter.of(dates(dateParser(date)))
    .filter(moonPhaseFilter(phaseOffset))
    .take(1)
    .toArray()[0];
};

const moonPhaseFilter = offset => {
  return function(date) {
    let currentPhase = (findMoonIllumination(date).phase + offset) % 1;
    let nextPhase = (findMoonIllumination(addDays(date, 1)).phase + offset) % 1;
    return nextPhase - currentPhase < 0;
  };
};

const moonCresentPhaseFilter = (min, max) => {
  return function(date) {
    let illumination = findMoonIllumination(date).phase;
    return illumination > min && illumination < max;
  };
};

module.exports = {
  dates,
  findMoonRiseSet,
  findMoonIllumination,
  moonPhaseOn,
  nextMoonPhaseOccurance,
  moonPhaseFilter
};
