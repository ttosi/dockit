import { MongoClient } from "mongodb";

const database = {
  conn: undefined,
  async connect() {
    const client = new MongoClient("mongodb://127.0.0.1:27017/");
    await client.connect();
    this.conn = client.db("dockit");
  },
  async find(collection, filter) {
    const c = this.conn.collection(collection);
    return await c.findOne(filter);
  },
  async create() {},
  async replace(collection, user, body) {
    const c = this.conn.collection(collection);
    return await c.replaceOne(user, body);
  },
  async update(collection, filter, action) {
    const coll = this.conn.collection(collection);
    return await coll.updateOne(filter, action);
  },
  async delete() {},
};

export { database };
