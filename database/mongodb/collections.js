async function createCollections(db) {
  await db.createCollection("categories");
  await db.createCollection("attributes");
  console.log("Created database and collections.")
}

exports.createCollections = createCollections;
