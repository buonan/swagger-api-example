import express from "express";
import HelloController from "../controllers/hello";
import PingController from "../controllers/ping";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/", async (_req, res) => {
    const controller = new HelloController();
    const response = await controller.getHello();
    return res.send(response);
  });

export default router;