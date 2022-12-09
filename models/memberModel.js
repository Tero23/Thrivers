const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name!"],
    lowercase: true,
  },
  role: {
    type: String,
    required: [true, "Please provide a role!"],
  },
  image: {
    type: String,
  },
  linkedIn: {
    type: String,
    required: [true, "Please provide your linkedIn link!"],
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
