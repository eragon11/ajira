const path = require("path");

let config = {
  logs: {
    path: path.join(__dirname, "../logs"),
    file_name: "development.wiApp.logs",
  }
};

module.exports = config;
