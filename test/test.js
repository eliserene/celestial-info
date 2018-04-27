const expect = require("chai").expect;

describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});

var sunCalc = require("suncalc"); //library for calcuating sun/moon positions and phases
var dateParser = require("date-fns/parse");

describe("SunCalc", function() {
  describe("moon times", function() {
    it("should return moon rise and moon set", function() {
      let input = {
        date: "2018/04/26",
        latitude: -27,
        longitude: 153
      };
      let moonTimes = sunCalc.getMoonTimes(
        dateParser(input.date),
        input.latitude,
        input.longitude
      );
      expect(moonTimes).to.have.property("rise");
      expect(moonTimes).to.have.property("set");
    });
  });
});
