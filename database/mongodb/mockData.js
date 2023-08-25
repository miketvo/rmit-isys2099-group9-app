const mongoose = require('mongoose');

async function insertMockData(uri) {
  try {
    await mongoose.connect(uri);

    console.log("Inserted mock data.");
  } catch (error) {
    console.log(`Failed to insert mock data: ${error}`);
  }
}

exports.insertMockData = insertMockData;
