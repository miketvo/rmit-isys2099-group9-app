async function insertMockData(db) {
  const categories = [];
  const attributes = [];

  await db.collection("categories").insertMany(categories);
  await db.collection("categories").insertMany(attributes);

  console.log("Inserted mock data.");
}

exports.insertMockData = insertMockData;
