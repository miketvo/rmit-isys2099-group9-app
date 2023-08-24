const { MongoClient, ServerApiVersion } = require("mongodb");
const { createCollections } = require("./collections");
const { insertMockData } = require("./mockData");

const uri = "mongodb://127.0.0.1:27017/"; // Putting localhost here will NOT work
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    console.log(`Connecting to MongoDB at "${uri}"...`);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    await client.db("isys2099_group9_app").dropDatabase();
    console.log("Database cleared!");

    const db = client.db("isys2099_group9_app");
    await createCollections(db);
    if (process.argv.length > 2 && process.argv[2] === "--mock") {
      await insertMockData(db);
    }

    console.log("Database initialized!");
  } finally {
    await client.close();
  }
})().catch(console.dir);
