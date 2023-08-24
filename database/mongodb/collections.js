async function createCollections(db) {
  await db.createCollection("productAttributes");
  console.log("Created database and collections.");
}

exports.createCollections = createCollections;
