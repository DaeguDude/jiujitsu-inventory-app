const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo_url: { type: String, required: true },
});

BrandSchema.virtual("url").get(function () {
  return `/catalog/brand/${this.id}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
