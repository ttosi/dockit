import bcrypt from "bcrypt-nodejs";

const salt = bcrypt.genSaltSync(10);
const pass = bcrypt.hashSync("<PASSWORD_TO_HASH>", salt);
console.log(pass);
