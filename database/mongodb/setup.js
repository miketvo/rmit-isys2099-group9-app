const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://localhost:27017";  // Putting localhost here will NOT work
const client = new MongoClient(uri,  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

(async () => {
  try {
    console.log(`Connecting to MongoDB at "${uri}"...`);
    await client.connect();
    await client.db("local").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
})().catch(console.dir);
