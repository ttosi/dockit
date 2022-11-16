import express from "express";
import bcrypt from 'bcrypt-nodejs'
import { network } from "../services/network.js";

const salt = bcrypt.genSaltSync(10)
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(bcrypt.compareSync())
  const auth = await network.post("/_design/auth/_view/authenticate?key=%22ttosi519%40gmail.com%22")
    .then(d => {
      res.json({ hey: "hello" })
    })
  // console.log(auth)
  // console.log(req.body)
  // console.log(auth.rows[0].value)
  // const authenticated = bcrypt.compareSync(req.body.password, auth.rows[0].value)
  // console.log(authenticated)
  // res.json({
  //   // authenticated:  bcrypt.compareSync(req.body.password, auth.rows[0].value)
  //   authenticated:  true
  // })
});

export default router;
