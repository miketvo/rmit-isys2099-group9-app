async function createCollections(db) {
  await db.createCollection("products");
  console.log("Created database and collections.");
}

exports.createCollections = createCollections;
