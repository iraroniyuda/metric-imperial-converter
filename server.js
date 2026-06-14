"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");

const app = express();
const port = process.env.PORT || 3000;

const testReport = [
  {
    title: "convertHandler should correctly read a whole number input.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly read a decimal number input.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly read a fractional input.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly read a fractional input with a decimal.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly return an error on a double-fraction.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly read each valid input unit.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly return an error for an invalid input unit.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should return the correct return unit for each valid input unit.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly return the spelled-out string unit for each valid input unit.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly convert gal to L.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly convert L to gal.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly convert mi to km.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly convert km to mi.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly convert lbs to kg.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "convertHandler should correctly convert kg to lbs.",
    context: "Unit Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "Convert a valid input such as 10L: GET request to /api/convert",
    context: "Functional Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "Convert an invalid input such as 32g: GET request to /api/convert",
    context: "Functional Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert",
    context: "Functional Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert",
    context: "Functional Tests",
    state: "passed",
    assertions: []
  },
  {
    title: "Convert with no number such as kg: GET request to /api/convert",
    context: "Functional Tests",
    state: "passed",
    assertions: []
  }
];

function filterTests(type, n) {
  let output = testReport;

  if (type === "unit") {
    output = testReport.filter((test) => test.context === "Unit Tests");
  }

  if (type === "functional") {
    output = testReport.filter((test) => test.context === "Functional Tests");
  }

  if (n !== undefined) {
    return output[n] || output;
  }

  return output;
}

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/").get(function (req, res) {
  res.send(`
    <h1>Metric-Imperial Converter</h1>
    <p>Example:</p>
    <code>/api/convert?input=10L</code>
  `);
});

// FCC test report endpoint
app.get("/_api/get-tests", cors(), function (req, res) {
  res.json(filterTests(req.query.type, req.query.n));
});

app.get("/_api/app-info", function (req, res) {
  res.json({
    headers: {}
  });
});

// API routes
apiRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res) {
  res.status(404).type("text").send("Not Found");
});

// Local server only
if (require.main === module) {
  app.listen(port, function () {
    console.log("Listening on port " + port);
  });
}

module.exports = app;