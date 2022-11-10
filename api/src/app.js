import https from "https";
import fs from "fs";
import express from "express";
import bodyParser from "express";
import projects from "./api/projects.js";
import stages from "./api/stages.js";
import document from "./api/document.js";

const app = express();
const port = 3000;

// res.header("jwt", "382d4be5-e002-46c3-ae03-5ef4c2c1ebf3")

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if(req.headers["jwt"] !==  "382d4be5-e002-46c3-ae03-5ef4c2c1ebf3") {
    res.sendStatus(403)
    return
  }
  next();
});

app.use("/projects", projects);
app.use("/document", document);
app.use("/stages", stages);

https.createServer({
  key: fs.readFileSync("./src/privkey.pem"),
  cert: fs.readFileSync("./src/cert.pem"),
}, app)
.listen(port, () => {
  console.log(`server listening on port ${port}`);
});