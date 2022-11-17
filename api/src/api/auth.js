import express from "express";
import bcrypt from "bcrypt-nodejs";
import { v4 as uuidv4 } from "uuid";
import { network } from "../services/network.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // email and/or password missing in body
  if (!email || !password) {
    res.json({
      authenticated: false,
      code: 400,
      status: "Bad Request",
    });
    return;
  }

  // get encrypted password from user auth design doc
  const userInfo = await network.post(`/_design/user/_view/authenticate`, {
    key: email,
  });

  // no user found with that email
  if (userInfo.rows.length !== 1) {
    res.json({
      authenticated: false,
      code: 404,
      status: "Not Found",
    });
    return;
  }

  // hash and check password is valid
  const authorized = bcrypt.compareSync(
    password,
    userInfo.rows[0].value.password
  );

  // passwords don't match
  if (!authorized) {
    res.json({
      authenticated: false,
      code: 401,
      status: "Not Authorized",
    });
    return;
  }

  // user is authorized, generate token
  const token = uuidv4();

  // update the token for the user
  await network.put(`/${userInfo.rows[0].id}`, {
    _rev: userInfo.rows[0].value.rev,
    role: "user",
    email: email,
    password: userInfo.rows[0].value.password,
    token: token,
    expires: "",
  });

  // get the projects for the user
  const projects = await network.post(`/_design/user/_view/projects`, {
    key: email,
  });

  res.json({
    authenticated: true,
    token: token,
    data: projects.rows[0],
  });
});

router.post("/new", async (req, res) => {
  res.sendStatus(501);
});

export default router;
