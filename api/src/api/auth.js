import express from "express";
import { network } from "../services/network.js";

const router = express.Router();

router.post("/", async (req, res) => {
  res.json({
    authenticated: true
  })
});

export default router;
