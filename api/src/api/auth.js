import express from "express";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt-nodejs";
import { v4 as uuidv4 } from "uuid";
import { network } from "../services/network.js";
import { database } from "../services/database.js";

const router = express.Router();
database.connect("users");

router.post("/", async (req, res) => {
  const { email, password } = await req.body;

  // email and password not in request
  if (!email || !password) {
    res.json({
      authenticated: false,
      statusCode: 400,
    });
    return;
  }

  const user = await database.find("users", { email: email });
  // user not found
  if (!user) {
    res.json({
      authenticated: false,
      statusCode: 404,
    });
    return;
  }

  // password is invalid
  if (!bcrypt.compareSync(password, user.password)) {
    res.json({
      authenticated: false,
      statusCode: 401,
    });
    return;
  }

  // set user token
  let token = user.token;
  if (!token) {
    token = uuidv4();
    await database.update(
      "users",
      { email: email },
      { $set: { token: token } }
    );
  }

  res.json({
    authenticated: true,
    email: user.email,
    token: token,
  });
});

router.post("/new", async (req, res) => {
  res.sendStatus(501);
});

export default router;
