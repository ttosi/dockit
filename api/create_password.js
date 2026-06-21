import bcrypt from "bcrypt-nodejs";

const salt = bcrypt.genSaltSync(10);
const pass = bcrypt.hashSync("<PASSWRD>", salt);
console.log(pass);
