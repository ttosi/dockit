import express from "express";
import { network } from "../services/network.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const document = await network.post("_find", {
    selector: {
      user: {
        $eq: "ttosi519@gmail.com",
      },
    },
  });
  if(document === 401) {
    res.sendStatus(401)
    return
  }
  res.json(document.docs[0]);
});

router.post("/", async (req, res) => {
  // console.log(req.body);
  // const response = await network.post("", req.body);
  // console.log(response);
  // res.sendStatus(200);
});

export default router;
