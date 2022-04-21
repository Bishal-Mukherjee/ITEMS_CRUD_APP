const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  Id: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = Items = mongoose.model("items", itemsSchema);
