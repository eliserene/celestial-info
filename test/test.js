const expect = require("chai").expect;

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});

const handlers = require("../lib/handler.js");
var sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
var dateParser = require("date-fns/parse");

describe("SunCalc", function() {
  let moonTimes = {};
  let moonIllumination = {};
  before(function() {
    // runs before all tests in this block
    let input = {
      date: "2018/04/26",
      latitude: -27,
      longitude: 153
    };
    moonTimes = handlers.findMoonRiseSet(input);
    moonIllumination = handlers.findMoonIllumination(input);
  });

  describe("moon times", function() {
    it("should return moon rise and moon set", function() {
      expect(moonTimes).to.have.property("rise");
      expect(moonTimes).to.have.property("set");
    });

    it("should return moon rise and set as Dates", function() {
      expect(moonTimes.rise).to.be.a("date");
      expect(moonTimes.set).to.be.a("date");
    });
  });

  describe("moon illumination", function() {
    it("should return the correct properties", function() {
      expect(moonIllumination).to.have.property("fraction");
    });
  });
});
