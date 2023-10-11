import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);
const dbName = "dockit";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection_projects = db.collection("projects");

  const insert_projects = await collection_projects.insertOne(seedData);
  console.log(insert_projects);

  const find_projects = await collection_projects.find({}).toArray();
  console.log(find_projects);

  const collection_users = db.collection("users");
  const insert_user = await collection_users.insertOne({
    email: "ttosi519@gmail.com",
    password: "$2a$10$vJU8hHnYkVjDjolfQZQRtexLTGXNbshsp2bUTs.vSLB2b910jUKbi",
    token: ""
  });
  console.log(insert_user);
  const find_user = await collection_users.find({}).toArray();
  console.log(find_user);

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
