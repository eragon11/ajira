import roverService from "./service";
const axios = require("axios");
const roverController = {};

/*
rd -> rover data
ed -> environment data
rf -> rover find
ef -> environment find
ec -> environment create
rc -> rover create
eu -> environment update
*/

roverController.environmentConfigure = async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    let ed = await roverService.ec(body);
    console.log(ed);
    res.send({
      code: 200,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "bad request",
    });
  }
};

roverController.environmentUpdate = async (req, res) => {
  try {
    let body = req.body;
    let eud = await roverService.eu(body);
    console.log(eud);
    res.send({
      code: 200,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "bad request",
    });
  }
};

roverController.roverConfigure = async (req, res) => {
  try {
    let body = req.body;
    let rd = await roverService.rc(body);
    console.log(rd);
    res.send({
      code: 200,
      msg: "success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "bad request",
    });
  }
};

roverController.roverMove = async (req, res) => {
  try {
    let direction = req.body.direction;
    let rd = await roverService.rf();
    let ed = await roverService.ef();
    console.log(rd);
    console.log(rd["location"]["row"]);
    console.log(rd["location"]["column"]);
    if (direction == "up" || direction == "down") {
      if ((rd["location"]["row"] > 1 && rd["location"]["row"] < 5) ||
      (direction == "up" && rd["location"]["row"] < 5)) {
        if (ed["storm"]) {
          res.send({
            code: 428,
            message: "Cannot move during a storm",
          });
        } else {
          let uj = {
            location: {
              row: movementud(direction, rd["location"]["row"]),
              column: movementlr(direction, rd["location"]["column"]),
            },
            battery: rd["battery"] <= 1 ? 11 : rd["battery"] - 1,
          };
          let ru = await roverService.ru(uj);
          let rud = await axios.default.get(
            "http://localhost:8282/api/rover/status"
          );
          console.log(rud["data"]);
          res.send(rud["data"]);
        }
      } else {
        res.send({
          code: 428,
          message: "Can move only within mapped area",
        });
      }
    } else {
      if (
        (rd["location"]["column"] > 1 && rd["location"]["column"] < 5) ||
        (direction == "right" && rd["location"]["column"] < 5)
      ) {
        if (ed["storm"]) {
          res.send({
            code: 428,
            message: "Cannot move during a storm",
          });
        } else {
          let uj = {
            location: {
              row: movementud(direction, rd["location"]["row"]),
              column: movementlr(direction, rd["location"]["column"]),
            },
            battery: rd["battery"] <= 1 ? 11 : rd["battery"] - 1,
          };
          let ru = await roverService.ru(uj);
          let rud = await axios.default.get(
            "http://localhost:8282/api/rover/status"
          );
          console.log(rud["data"]);
          res.send(rud["data"]);
        }
      } else {
        res.send({
          code: 428,
          message: "Can move only within mapped area",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "bad request",
    });
  }
};

function movementud(type, value) {
  if (type == "up") {
    return ++value;
  } else if (type == "down") {
    return --value;
  } else {
    return value;
  }
}

function movementlr(type, value) {
  if (type == "left") {
    return --value;
  } else if (type == "right") {
    return ++value;
  } else {
    return value;
  }
}

roverController.roverStatus = async (req, res) => {
  try {
    let rd = await roverService.rf();
    let ed = await roverService.ef();

    let cj = {
      rover: {
        location: {
          row: rd["location"]["row"],
          column: rd["location"]["column"],
        },
        battery: rd["battery"],
        inventory: rd["inventory"],
      },
      environment: {
        temperature: ed["temperature"],
        humidity: ed["humidity"],
        "solar-flare": ed["solar-flare"],
        storm: ed["storm"],
        terrain: ed["terrain"],
      },
    };
    res.send(cj);
  } catch (error) {
    console.log(error);
    res.send({
      code: 400,
      msg: "bad request",
    });
  }
};

export default roverController;
