import express from "express";
import { MongoClient } from "mongodb";
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
    req.body
  );
  // res.json(document);
  // await network.post("/", req.body);
  // await client.connect();
  // const db = client.db(dbName);
  // const collection = db.collection("projects");

  // const oldDoc = await collection.findOne({ user: "ttosi519@gmail.com" });
  // const newDoc = req.body;

  // console.log("old", oldDoc.projects[0].stage);
  // console.log("new", newDoc.projects[0].stage);

  // delete req.body._id;

  // const result = await collection.replaceOne(
  //   { email: "ttosi519@gmail.com" },
  //   req.body
  // );
  // console.log(result);
  res.json({
    status: 200,
  });
});

router.put("/", async (req, res) => {
  res.sendStatus(501);
});

export default router;
