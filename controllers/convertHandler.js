function ConvertHandler() {
  this.getNum = function (input) {
    const numberPart = input.match(/^[^a-zA-Z]+/);

    if (!numberPart) {
      return 1;
    }

    const num = numberPart[0];

    if ((num.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    const validNumberPattern = /^(\d+(\.\d+)?|\.\d+)(\/(\d+(\.\d+)?|\.\d+))?$/;

    if (!validNumberPattern.test(num)) {
      return "invalid number";
    }

    if (num.includes("/")) {
      const [numerator, denominator] = num.split("/");
      return parseFloat(numerator) / parseFloat(denominator);
    }

    return parseFloat(num);
  };

  this.getUnit = function (input) {
    const unitPart = input.match(/[a-zA-Z]+$/);

    if (!unitPart) {
      return "invalid unit";
    }

    const unit = unitPart[0].toLowerCase();

    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    if (!validUnits.includes(unit)) {
      return "invalid unit";
    }

    return unit === "l" ? "L" : unit;
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const unitNames = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return unitNames[unit];
  };

  this.convert = function (initNum, initUnit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592,
    };

    const result = initNum * conversionRates[initUnit];

    return Math.round(result * 100000) / 100000;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;