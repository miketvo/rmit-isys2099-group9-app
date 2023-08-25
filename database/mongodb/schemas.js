const { Schema } = require("mongoose");

const attributeSchema = new Schema({
  sqlId: String,
  value: Schema.Types.Mixed,
});

const productSchema = new Schema({
  sqlId: Number,
  attributes: [attributeSchema],
});

exports.attributeSchema = attributeSchema;
exports.productSchema = productSchema;
