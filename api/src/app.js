import http from "http";
import express from "express";
import { database } from "./services/database.js";
import bodyParser from "express";
import cookieParser from "cookie-parser";
import document from "./api/document.js";
import auth from "./api/auth.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("./web"));

database.connect();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Headers, Origin, X-Auth-Token, X-Auth-User, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(async (req, res, next) => {
  // skip if authenticating or OPTIONS request
  if (req.url === "/auth" || req.method === "OPTIONS") {
    next();
    return;
  }

  const user = await database.find("users", {
    email: req.headers["x-auth-user"],
  });

  // user by email not found
  if (!user) {
    res.sendStatus(404);
    return;
  }

  // requested token and api generated token do not match
  if (req.headers["x-auth-token"] !== user.token) {
    res.sendStatus(403);
    return;
  }
  next();
});

app.use("/document", document);
app.use("/auth", auth);

http.createServer(app).listen(port, () => {
  console.log(`listening on port ${port}`);
});
