import express from "express";
const router = express.Router();
import roverctrl from "./ctrl";

router.post("/environment/configure", roverctrl.environmentConfigure);

router.patch("/environment", roverctrl.environmentUpdate);

router.post("/rover/configure", roverctrl.roverConfigure);

router.patch("/rover/move", roverctrl.roverMove);

router.get("/rover/status", roverctrl.roverStatus);

export default router;
