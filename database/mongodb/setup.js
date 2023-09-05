const { MongoClient, ServerApiVersion } = require("mongodb");
const { createCollections } = require("./collections");
const { insertMockData } = require("./mockData");

const connectionUri = "mongodb+srv://user01:user0123456789@cluster0.rvqafdr.mongodb.net/"; // Putting localhost here will NOT work
const databaseName = "isys2099_group9_app";
const client = new MongoClient(connectionUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    console.log(`Connecting to MongoDB at "${connectionUri}"...`);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    await client.db(databaseName).dropDatabase();
    console.log("Database cleared!");

    const db = client.db(databaseName);
    await createCollections(db);
    if (process.argv.length > 2 && process.argv[2] === "--mock") {
      await insertMockData(connectionUri + databaseName);
    }

    console.log("Database initialized!");
  } finally {
    await client.close();
  }
})().catch(console.dir);
