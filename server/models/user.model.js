const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastVisited: {
    type: Date,
    required: true
  },
  timesVisited: {
    type: Number,
    required: true
  },
  funFact
});

const User = mongoose.model("User", UserSchema);

module.exports = User;