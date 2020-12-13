import env from "./environment.model";
import rover from "./rover.model";

const roverService = {};

roverService.ec = async (data) => {
  try {
    let ToAdd = new env(data);
    const saved = await ToAdd.save();
    return saved;
  } catch (error) {
    throw error;
  }
};

roverService.eu = async (data) => {
  try {
    const updated = await env.updateOne({}, { $set: data }, { new: true });
    return updated;
  } catch (error) {
    throw error;
  }
};

roverService.ru = async (data) => {
  try {
    const updated = await rover.updateOne({}, { $set: data }, { new: true });
    return updated;
  } catch (error) {
    throw error;
  }
};

roverService.rc = async (data) => {
  try {
    let ToAdd = new rover(data);
    const saved = await ToAdd.save();
    return saved;
  } catch (error) {
    throw error;
  }
};

roverService.rf = async () => {
  try {
    const rover_data = await rover.findOne();
    return rover_data;
  } catch (error) {
    throw error;
  }
};

roverService.ef = async () => {
  try {
    const env_data = await env.findOne();
    return env_data;
  } catch (error) {
    throw error;
  }
};

export default roverService;
