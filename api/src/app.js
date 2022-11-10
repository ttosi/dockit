import https from "https";
import fs from "fs";
import express from "express";
import bodyParser from "express";
import auth from "./api/auth.js";
import document from "./api/document.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  if(req.url === "/auth") {
    next()
  }
  next()
})

// auth middlewaree

app.use("/auth", auth);
app.use("/document", document);
// app.use("/stages", stages);

https.createServer({
  key: fs.readFileSync("./src/privkey.pem"),
  cert: fs.readFileSync("./src/cert.pem"),
}, app)
.listen(port, () => {
  console.log(`server ready on port ${port}`);
});