async function insertMockData(db) {
  const attributes = [
    { sqlId: "Battery powered" },
    { sqlId: "Brand" },
    { sqlId: "Color" },
    { sqlId: "CPU" },
    { sqlId: "Frequency range" },
    { sqlId: "GPU" },
    { sqlId: "Height" },
    { sqlId: "Key-cap profile" },
    { sqlId: "Latency" },
    { sqlId: "Length" },
    { sqlId: "Material" },
    { sqlId: "Noise cancelling" },
    { sqlId: "RAM" },
    { sqlId: "Refresh rate" },
    { sqlId: "Resolution" },
    { sqlId: "Screen size" },
    { sqlId: "Smart TV" },
    { sqlId: "Storage capacity" },
    { sqlId: "Switch type" },
    { sqlId: "Thickness" },
    { sqlId: "Voltage" },
    { sqlId: "Warranty" },
    { sqlId: "Warranty period" },
    { sqlId: "Wattage" },
    { sqlId: "Width" },
    { sqlId: "Wireless" },
  ];

  await db.collection("productAttributes").insertMany(attributes);
  console.log("Inserted mock data.");
}

exports.insertMockData = insertMockData;
