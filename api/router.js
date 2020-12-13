import express from "express";
import wiRouter from './modules/robo/route';


let router = express.Router();

router.use("/", wiRouter);

export default router;