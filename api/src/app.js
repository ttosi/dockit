import express from "express";
import bodyParser from "express";
import projects from "./api/projects.js";
import stages from "./api/stages.js";
import document from "./api/document.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/projects", projects);
app.use("/document", document);
app.use("/stages", stages);
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
