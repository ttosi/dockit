import express from "express";
import { network } from "../services/network.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const document = await network.post("/_find", {
    selector: {
      email: {
        $eq: "ttosi519@gmail.com",
      },
    },
  });
  console.log(document);
  res.json(document.docs[0]);
});

router.post("/", async (req, res) => {
  await network.post("/", req.body);
  const response = await network.currentRevision();
  res.json({
    status: 200,
    _rev: response,
  });
});

router.put("/", async (req, res) => {
  res.sendStatus(501);
});

export default router;
