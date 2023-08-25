const mongoose = require('mongoose');

async function insertMockData(uri) {
  try {
    await mongoose.connect(uri);

    console.log("Inserted mock data.");
    mongoose.connection.close()
  } catch (error) {
    console.log(`Failed to insert mock data: ${error}`);
    mongoose.connection.close()
  }
}

exports.insertMockData = insertMockData;
