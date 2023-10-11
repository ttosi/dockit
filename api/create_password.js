import bcrypt from "bcrypt-nodejs";

const salt = bcrypt.genSaltSync(10);
const pass = bcrypt.hashSync("mak3nna03", salt);
console.log(pass);
