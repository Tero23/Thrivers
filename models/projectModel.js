const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  organizationName: {
    type: String,
    required: [true, "Please provide an organization name or your name!"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide a contact Number!"],
  },
  Title: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  BriefDescription: {
    type: String,
    required: [true, "Please enter your description!"],
  },
  Deadline: {
    type: Date,
    required: [true, "Please enter your deadline!"],
  },
  SRSFile: {
    type: String,
    required: [true, "Please upload your SRS!"],
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
