const mongoose = require("mongoose");
const { Schema } = mongoose;

const GiSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  size: {
    type: String,
    required: true,
    enum: ["A0", "A1", "A2", "A3", "A4", "A5", "A6"],
  },
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

GiSchema.virtual("url").get(function () {
  return `/catalog/gi/${this.id}`;
});

// Compiles a model and exports it
module.exports = mongoose.model("Gi", GiSchema);
