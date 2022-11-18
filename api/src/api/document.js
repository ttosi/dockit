import express from "express";
import { MongoClient } from "mongodb";
import { network } from "../services/network.js";

const router = express.Router();
const url = "mongodb://tdc.app:27017";
const client = new MongoClient(url);
const dbName = "dockit";

router.get("/", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("projects");

  const document = await collection.findOne({ email: "ttosi519@gmail.com" });
  console.log(document);
  res.json(document);
  await client.close();
});

router.post("/", async (req, res) => {
  // await network.post("/", req.body);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("projects");

  // const oldDoc = await collection.findOne({ user: "ttosi519@gmail.com" });
  // const newDoc = req.body;

  // console.log("old", oldDoc.projects[0].stage);
  // console.log("new", newDoc.projects[0].stage);

  delete req.body._id;

  const result = await collection.replaceOne(
    { email: "ttosi519@gmail.com" },
    req.body
  );
  console.log(result);
  res.json({
    status: 200,
  });
});

router.put("/", async (req, res) => {
  res.sendStatus(501);
});

export default router;
