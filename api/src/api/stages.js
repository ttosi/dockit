import express from "express";
import { network } from "../services/network.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const document = await network.get("088b53bae88c75b1e11defa75e002847");
  res.json(document.stages);
});

export default router;
