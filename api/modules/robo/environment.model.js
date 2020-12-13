import mongoose from "mongoose";

const EnvironmentSchema = mongoose.Schema(
  {
    temperature: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    "solar-flare": {
      type: Boolean,
    },
    storm: {
      type: Boolean,
    },
    "area-map": [[{
      type: String,
      enum: ["dirt", "water", "rock", "sand"],
    }]],
  },
  { collection: "environment" }
);

let EnvironmentModel = mongoose.model("environment", EnvironmentSchema);

export default EnvironmentModel;
