import bcrypt from "bcrypt-nodejs";

const salt = bcrypt.genSaltSync(10);
const pass = bcrypt.hashSync("joespass", salt);
console.log(pass);
