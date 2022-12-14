const SERVER = "http://34.234.74.60:3000";
var upm = require("jsupm_adxl345");
var adxl = new upm.Adxl345(0);
const axios = require("axios");

function Main(delay) {
  console.log("Here 1");

  setInterval(() => {
    updateServer();
  }, delay);
}

Main(300);

function updateServer() {
  adxl.update();
  var force = adxl.getAcceleration();
  force.setitem(2, force.getitem(2) - 1); // Z axis is off-center in my unit.

  var json = {
    key:
      '{"x": ' +
      force.getitem(0).toFixed(2) +
      ', "y": ' +
      force.getitem(1).toFixed(2) +
      ', "z": ' +
      force.getitem(2).toFixed(2) +
      "}",
  };
  axios.post(SERVER, json, function (error, response, body) {
    console.log("Uploaded.");
    if (!error && response.statusCode == 200) {
      console.log("SUCCESS");
    }
  });
}
