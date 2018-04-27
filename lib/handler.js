var express = require("express");
var sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
var dateParser = require("date-fns/parse");

exports.findMoonRiseSet = input => {
  return sunCalc.getMoonTimes(
    dateParser(input.date),
    input.latitude,
    input.longitude
  );
};
