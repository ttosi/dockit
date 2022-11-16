import fetch, { Headers } from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

const network = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  url: process.env.DATABASE_URL,
  auth() {
    return new Headers({
      Authorization: `Basic ${Buffer.from(
        this.username + ":" + this.password
      ).toString("base64")}`,
    });
  },
  async get(endpoint) {
    return await fetch(`${this.url}${endpoint}`, {
      method: "GET",
      headers: this.auth(),
    })
    .then((res) => res.json())
    .then((data) => data);
  },
  async post(endpoint, payload) {
    return await fetch(`${this.url}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          this.username + ":" + this.password
        ).toString("base64")}`,
      },
      body: JSON.stringify(payload),
    })
    .then((res) => {
      if(res.status !== 200) {
        return res.status
      }
      return res.json()
    })
    .then((data) => {
      return data
    });
  },
  async put() {},
  async delete() {},
  async currentRevison() {
    const document = await network.post("/_find", {
      selector: {
        user: {
          $eq: "ttosi519@gmail.com",
        },
      },
    });
    return document.docs[0]._rev
  }
};

export { network };
