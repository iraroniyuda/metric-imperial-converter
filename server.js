"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");

const app = express();

const port = process.env.PORT || 3000;
const isVercel = process.env.VERCEL === "1";
const isTest = process.env.NODE_ENV === "test";

let testsStarted = false;

function startTests() {
  if (testsStarted) return;
  testsStarted = true;

  console.log("Running Tests...");

  setTimeout(function () {
    try {
      const runner = require("./test-runner");
      runner.run();
    } catch (e) {
      console.log("Tests are not valid:");
      console.error(e);
    }
  }, 1500);
}

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page
app.route("/").get(function (req, res) {
  res.send(`
    <h1>Metric-Imperial Converter</h1>
    <p>Example:</p>
    <code>/api/convert?input=10L</code>
  `);
});

// FCC testing routes
// Needed so freeCodeCamp can read unit and functional test results.
if (!isVercel || isTest) {
  const fccTestingRoutes = require("./routes/fcctesting.js");
  fccTestingRoutes(app);
}

// API routes
apiRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res) {
  res.status(404).type("text").send("Not Found");
});

// Local server only
if (!isVercel) {
  app.listen(port, function () {
    console.log("Listening on port " + port);

    if (isTest) {
      startTests();
    }
  });
}

// Vercel does not use app.listen.
// But FCC still needs the tests to run when NODE_ENV=test.
if (isVercel && isTest) {
  startTests();
}

module.exports = app;