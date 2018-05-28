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
const format = require("date-fns/format");

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

  describe("moon phase on date", function() {
    it("should return the correct phase for the given date", function() {
      expect(helpers.moonPhaseOn(dateParser("2018-05-15T00:00:00Z"))).to.equal(
        "New Moon"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-05-16T00:00:00Z"))).to.equal(
        "Waxing Crescent"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-05-22T00:00:00Z"))).to.equal(
        "First Quarter"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-05-28T00:00:00Z"))).to.equal(
        "Waxing Gibbous"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-05-29T00:00:00Z"))).to.equal(
        "Full Moon"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-05-30T00:00:00Z"))).to.equal(
        "Waning Gibbous"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-06-06T00:00:00Z"))).to.equal(
        "Third Quarter"
      );
      expect(helpers.moonPhaseOn(dateParser("2018-06-10T00:00:00Z"))).to.equal(
        "Waning Crescent"
      );
    });
  });

  describe("moon phase filter", function() {
    it("should return true if the phase occurs on the given date", function() {
      //New moon
      let newMoonTest = helpers.moonPhaseFilter(0);
      expect(newMoonTest(dateParser("2018-05-14T00:00:00Z"))).to.equal(false);
      expect(newMoonTest(dateParser("2018-05-15T00:00:00Z"))).to.equal(true);
      expect(newMoonTest(dateParser("2018-05-16T00:00:00Z"))).to.equal(false);

      //Full moon
      let fullMoonTest = helpers.moonPhaseFilter(0.5);
      expect(fullMoonTest(dateParser("2018-05-29T00:00:00Z"))).to.equal(true);
    });
  });

  describe("next moon phase occurance", function() {
    it("should return the date of the next New Moon", function() {
      let newMoon = 0;
      let mayNewMoon = helpers.nextMoonPhaseOccurance(
        dateParser("2018-05-01T00:00Z"),
        newMoon
      );
      expect(format(mayNewMoon, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-05-15T00:00Z"), "YYYY-MM-DD")
      );
    });

    it("should return the date of the next Full Moon", function() {
      let fullMoon = 0.5;
      let mayFullMoon = helpers.nextMoonPhaseOccurance(
        dateParser("2018-05-25T00:00Z"),
        fullMoon
      );
      expect(format(mayFullMoon, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-05-29T00:00Z"), "YYYY-MM-DD")
      );
    });

    it("should return the date of the next Third Quater", function() {
      let thirdQuater = 0.25;
      let juneThirdQuater = helpers.nextMoonPhaseOccurance(
        dateParser("2018-05-25T00:00Z"),
        thirdQuater
      );
      expect(format(juneThirdQuater, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-06-06T00:00Z"), "YYYY-MM-DD")
      );
    });

    it("should return the date of the next First Quater", function() {
      let firstQuater = 0.75;
      let juneFirstQuater = helpers.nextMoonPhaseOccurance(
        dateParser("2018-05-25T00:00Z"),
        firstQuater
      );
      expect(format(juneFirstQuater, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-06-20T00:00Z"), "YYYY-MM-DD")
      );
    });
  });
  //
  // describe("moon phase on a particular date", function() {
  //   it("should return the a description of the moon on a given date", function() {});
  // });
});

describe("fun with generators", function() {
  describe("date generators", function() {
    const Iter = require("fl-generators");

    var gen = helpers.dates(dateParser("2018-04-18T00:00Z"));
    it("should return the initial date on first yield", function() {
      expect(format(gen.next().value, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-04-18T00:00Z"), "YYYY-MM-DD")
      );
    });
    it("should return the next day on second yields", function() {
      expect(format(gen.next().value, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-04-19T00:00Z"), "YYYY-MM-DD")
      );
    });
    it("should return the initial day + two on third yield", function() {
      expect(format(gen.next().value, "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-04-20T00:00Z"), "YYYY-MM-DD")
      );
    });

    let blockOfDates = Iter.of(helpers.dates(dateParser("2018-04-01T00:00Z")))
      .take(33)
      .toArray();
    it("should return dates as an array", function() {
      expect(blockOfDates.length).to.equal(33);
      expect(format(blockOfDates[0], "YYYY-MM-DD")).to.equal(
        format(dateParser("2018-04-01T00:00Z"), "YYYY-MM-DD")
      );
    });
  });
});
