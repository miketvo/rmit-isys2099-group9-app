const mongoose = require("mongoose");
const { productSchema } = require("./schemas");

async function insertMockData(uri) {
  try {
    await mongoose.connect(uri);

    const Product = mongoose.model("Product", productSchema);
    await Product.insertMany([
      {
        sqlId: 1,
        attributes: [
          { sqlId: "Warranty", value: true },
          { sqlId: "Warranty period", value: "2 years" },
          { sqlId: "Brand", value: "Sumsang" },
          { sqlId: "Width", value: 5 },
          { sqlId: "Length", value: 8 },
          { sqlId: "Thickness", value: 0.25 },
          { sqlId: "Color", value: "Red" },
          { sqlId: "RAM", value: "16GB" },
          { sqlId: "CPU", value: "Quad-core" },
          { sqlId: "Storage capacity", value: "256GB" },
          { sqlId: "Resolution", value: "1080p" },
        ],
      },
      {
        sqlId: 2,
        attributes: [],
      },
      {
        sqlId: 3,
        attributes: [],
      },
      {
        sqlId: 4,
        attributes: [],
      },
      {
        sqlId: 5,
        attributes: [],
      },
      {
        sqlId: 6,
        attributes: [
          { sqlId: "Warranty", value: true },
          { sqlId: "Warranty period", value: "2 years" },
          { sqlId: "Brand", value: "Steinheiser" },
          { sqlId: "Wireless", value: true },
          { sqlId: "Battery powered", value: true },
          { sqlId: "Latency", value: "less than 1ms" },
          { sqlId: "Noise cancelling", value: true },
          { sqlId: "Frequency range", value: "20 Hz to 20,000 Hz" },
        ],
      },
      {
        sqlId: 7,
        attributes: [],
      },
      {
        sqlId: 8,
        attributes: [
          { sqlId: "Warranty", value: true },
          { sqlId: "Warranty period", value: "5 years" },
          { sqlId: "Brand", value: "Sumsang" },
          { sqlId: "Color", value: "Black" },
          { sqlId: "Voltage", value: "120V" },
          { sqlId: "Wattage", value: "180W" },
          { sqlId: "SmartTV", value: true },
          { sqlId: "Screen size", value: "60in" },
          { sqlId: "Resolution", value: "4K" },
        ],
      },
      {
        sqlId: 9,
        attributes: [],
      },
      {
        sqlId: 10,
        attributes: [],
      },
      {
        sqlId: 11,
        attributes: [],
      },
      {
        sqlId: 12,
        attributes: [],
      },
      {
        sqlId: 13,
        attributes: [],
      },
      {
        sqlId: 14,
        attributes: [],
      },
      {
        sqlId: 15,
        attributes: [],
      },
      {
        sqlId: 16,
        attributes: [],
      },
      {
        sqlId: 17,
        attributes: [],
      },
      {
        sqlId: 18,
        attributes: [],
      },
      {
        sqlId: 19,
        attributes: [],
      },
      {
        sqlId: 20,
        attributes: [],
      },
      {
        sqlId: 21,
        attributes: [],
      },
      {
        sqlId: 22,
        attributes: [
          { sqlId: "Warranty", value: true },
          { sqlId: "Warranty period", value: "1 years" },
          { sqlId: "Brand", value: "Pineapple" },
          { sqlId: "Width", value: 4 },
          { sqlId: "Length", value: 6 },
          { sqlId: "Thickness", value: 1 },
          { sqlId: "Color", value: "Silver" },
          { sqlId: "RAM", value: "2GB" },
          { sqlId: "CPU", value: "Duo-core" },
          { sqlId: "Storage capacity", value: "64GB" },
          { sqlId: "Resolution", value: "320p" },
        ],
      },
      {
        sqlId: 23,
        attributes: [],
      },
      {
        sqlId: 24,
        attributes: [
          { sqlId: "Warranty", value: false },
          { sqlId: "Brand", value: "Pineapple" },
          { sqlId: "Color", value: "Pink" },
          { sqlId: "Voltage", value: "120V" },
          { sqlId: "Wattage", value: "200W" },
          { sqlId: "SmartTV", value: false },
          { sqlId: "Screen size", value: "10in" },
          { sqlId: "Resolution", value: "320p" },
        ],
      },
      {
        sqlId: 25,
        attributes: [],
      },
      {
        sqlId: 26,
        attributes: [],
      },
    ]);

    console.log("Inserted mock data.");
    mongoose.connection.close();
  } catch (error) {
    console.log(`Failed to insert mock data: ${error}`);
    mongoose.connection.close();
  }
}

exports.insertMockData = insertMockData;
