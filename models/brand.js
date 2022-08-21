const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

BrandSchema.virtual("url").get(function () {
  // here you need to return the...some url and id
  // url + id
  return "";
});

module.exports = mongoose.model("Brand", BrandSchema);
