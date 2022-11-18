import { MongoClient } from "mongodb";
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://tdc.app:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "dockit";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("projects");

  // the following code examples can be pasted here...
  const insert = await collection.insertOne(seedData);
  console.log(insert);

  const find = await collection.find({}).toArray();
  console.log(find);

  // const del = await collection.deleteMany({ email: "ttosi519@gmail.com" });

  // const update = await collection.updateOne(
  //   { user: "ttosi519@gmail.com" },
  //   { $set: { test: true } }
  // );
  // console.log(update);

  // const remove = await collection.updateOne(
  //   { user: "ttosi519@gmail.com" },
  //   { $unset: { test: 1 } }
  // );

  // const find = await collection.find({}).toArray();
  // console.log(find);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

const seedData = {
  email: "ttosi519@gmail.com",
  projects: [
    {
      id: 1,
      name: "Dockit",
      description: "Web app to track personal projects.",
      completed: false,
      stage: { shortname: "new", name: "New Idea" },
      tasks: [],
      parts: [],
    },
    {
      id: 2,
      name: "Curing Box",
      description: "An automated curing for SLA prints.",
      completed: false,
      stage: { shortname: "new", name: "New Idea" },
      tasks: [],
      parts: [],
    },
  ],
  stages: [
    { shortname: "new", name: "New Idea" },
    { shortname: "planning", name: "Planning It" },
    { shortname: "working", name: "Working on It" },
    { shortname: "done", name: "Done with It" },
    { shortname: "tabled", name: "Tabled It" },
  ],
};
