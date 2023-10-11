import express from "express";
import { database } from "../services/database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const document = await database.find("projects", {
    email: req.headers["x-auth-user"],
  });
  res.json(document);
});

router.post("/", async (req, res) => {
  await database.replace(
    "projects",
    { email: req.headers["x-auth-user"] },
    { email: req.headers["x-auth-user"], ...req.body }
  );

  res.json({
    status: 200,
  });
});

router.put("/", async (req, res) => {
  res.sendStatus(501);
});

export default router;
