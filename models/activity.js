var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var activitySchema = new Schema({
  id: Number,
  creator: String,
  password: String,
  create_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("activity", activitySchema);
