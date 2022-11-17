import https from "https";
import http from "http";
import fs from "fs";
import express from "express";
import bodyParser from "express";
import document from "./api/document.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/document", document);

if (process.env.ENVIRONMENT === "local") {
  http.createServer(app).listen(port, () => {
    console.log(`listening locally on port ${port}`);
  });
} else {
  https
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
