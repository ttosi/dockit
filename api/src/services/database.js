import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.DATABASE_URL);

const database = {
  url: process.env.DATABASE_URL,
  // dbName: process.env.DATABASE_NAME,
  // client: new MongoClient(process.env.DATABASE_URL),
  conn: undefined,
  async connect() {
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    this.conn = client.db(process.env.DATABASE_NAME);
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
