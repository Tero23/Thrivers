const mongoose = require("mongoose");
const validator = require("validator");

const mentorshipApplicationSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: [true, "Please provide an email!"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
      },
      name: {
        type: String,
        required: [true, "Please provide your name!"],
      },
      contactNumber: {
        type: String,
        required: [true, "Please provide a contact Number!"],
      },
      college: {
        type: String,
        required: [true, "Please provide your college!"],
      },
      branch: {
        type: String,
        required: [true, "Please enter your branch!"],
      },
      yearOfPassOut: {
        type: Date,
        required: [true, "Please enter your years of pass out!"],
      },
      formProviderName: {
        type: String,
        required: [true, "Please enter the form provider's name!"],
      },
      mentorshipName: {
        type: String,
        required: [true, "Please enter the name of the membership program!"],
        enum: {
          values: [
            "AI/ML",
            "Java",
            "Flutter",
            "Web Dev"
          ],
          message:
            "type is either AI/ML, Java Flutter or Web Dev!",
        },
      },
      screenShot: {
        type: String,
        required: [true, "Please upload your screenShot!"],
      },
});

const MentorshipApplication = mongoose.model("MentorshipApplication", mentorshipApplicationSchema);

module.exports = MentorshipApplication;