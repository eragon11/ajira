import mongoose from "mongoose";

const RoverSchema = mongoose.Schema(
  {
    scenarios: [
      {
        name: {
          type: String,
        },
        conditions: [
          {
            type: {
              type: String,
              enum: ["rover", "environment"],
            },
            property: {
              type: String,
              enum: [
                "battery",
                "terrain",
                "temperature",
                "humidity",
                "solar-flare",
                "storm",
              ],
            },
            operator: {
              type: String,
              enum: ["eq", "ne", "lte", "gte", "lt", "gt"],
            },
            value: {
              type: String || Number || Boolean,
            },
          },
        ],
        rover: {
          is: {
            type: String,
          },
          performs: {
            "collect-sample":
              {
                type: {
                  type: String,
                  enum: ["water-sample", "rock-sample"],
                },
                qty: {
                  type: Number,
                },
              } || undefined,
            "item-usage":
              {
                type: {
                  type: String,
                  enum: ["storm-shield", "water-sample", "rock-sample"],
                },
                qty: {
                  type: Number,
                },
              } || undefined,
          },
        },
      },
    ],
    states: [
      {
        name: {
          type: String,
        },
        "allowed-actions": {
          type: String,
          enum: ["move", "collect-sample"],
        },
      },
    ],
    location: {
      row: {
        type: Number,
      },
      column: {
        type: Number,
      },
    },
    battery: {
      type: Number,
    },
    inventory: [
      {
        type: {
          type: String,
          enum: ["storm-shield", "water-sample", "rock-sample"],
        },
        qty: {
          type: Number,
        },
        priority: {
          type: Number,
        },
      },
    ],
  },
  { collection: "rover" }
);

let RoverModel = mongoose.model("rover", RoverSchema);

export default RoverModel;
