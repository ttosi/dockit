import https from "https";
import http from "http";
import fs from "fs";
import express from "express";
import bodyParser from "express";
import cookieParser from "cookie-parser";
import auth from "./api/auth.js";
import document from "./api/document.js";
import { network } from "./services/network.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-API-key, X-Username, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(async (req, res, next) => {
  // console.log("a", req.get("X-API-key"));
  // console.log("b", req.get("X-Username"));
  if (req.get("X-Username")) {
    const userInfo = await network.post(`/_design/user/_view/token`, {
      key: req.get("X-Username"),
    });
    console.log("xxxx", userInfo.rows[0].value);
    if (req.get("X-API-key") !== userInfo.rows[0].value) {
      res.sendStatus(403);
      return;
    }
    console.log("success");
  }
  next();
});

app.use("/document", document);
app.use("/auth", auth);

if (process.env.ENVIRONMENT === "local") {
  http.createServer(app).listen(port, () => {
    console.log(`listening locally on port ${port}`);
  });
} else {
  http
    .createServer(
      {
        key: fs.readFileSync("./keys/privkey.pem"),
        cert: fs.readFileSync("./keys/cert.pem"),
      },
      app
    )
    .listen(port, () => {
      console.log(`server ready on port ${port}`);
    });
}
