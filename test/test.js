const expect = require("chai").expect;

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});

const helpers = require("../helpers");
const sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
const dateParser = require("date-fns/parse");

describe("SunCalc", function() {
  let moonTimes = {};
  let moonIllumination = {};
  before(function() {
    // runs before all tests in this block
    let input = {
      date: "2018-04-26T00:00Z",
      latitude: -27,
      longitude: 153
    };
    moonTimes = helpers.findMoonRiseSet(input);
    moonIllumination = helpers.findMoonIllumination(input.date);
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
      expect(moonIllumination).to.have.property("phase");
      expect(moonIllumination).to.have.property("angle");
    });

    it("should return the phase as a number between 0.0 and 1", function() {
      expect(moonIllumination.phase).to.be.a("number");
      expect(moonIllumination.phase).to.be.within(0.0, 1.0);
    });
  });
});

describe("helpers", function() {
  describe("moon phase text", function() {
    it("should return a description of the moon phase", function() {
      expect(helpers.moonPhaseAsText(0)).to.equal("New Moon");
      expect(helpers.moonPhaseAsText(0.1)).to.equal("Waxing Crescent");
      expect(helpers.moonPhaseAsText(0.25)).to.equal("First Quarter");
      expect(helpers.moonPhaseAsText(0.4)).to.equal("Waxing Gibbous");
      expect(helpers.moonPhaseAsText(0.5)).to.equal("Full Moon");
      expect(helpers.moonPhaseAsText(0.7)).to.equal("Waning Gibbous");
      expect(helpers.moonPhaseAsText(0.75)).to.equal("Last Quarter");
      expect(helpers.moonPhaseAsText(0.9)).to.equal("Waning Crescent");
    });
  });
});
