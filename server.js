"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./routes/api.js");

const app = express();
const isVercel = process.env.VERCEL === "1";

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index page static HTML
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// FCC testing routes only for local development, not Vercel
if (!isVercel) {
  const fccTestingRoutes = require("./routes/fcctesting.js");
  fccTestingRoutes(app);
}

// API routes
apiRoutes(app);

// 404 Not Found Middleware
app.use(function (req, res) {
  res.status(404).type("text").send("Not Found");
});

const port = process.env.PORT || 3000;

// Start server only outside Vercel
if (!isVercel) {
  app.listen(port, function () {
    console.log("Listening on port " + port);

    if (process.env.NODE_ENV === "test") {
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
  });
}

module.exports = app;