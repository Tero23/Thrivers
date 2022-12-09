const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please provide a type!"],
    enum: {
      values: [
        "Web Developer Intern",
        "Flutter Developer Intern",
        "Digital Marketing Intern",
      ],
      message:
        "type is either Web Developer, Flutter Developer or Digital Marketing!",
    },
  },
  details: [
    {
      name: {
        type: String,
        required: [true, "Please provide a name!"],
      },
      numberOfOpenings: {
        type: Number,
        required: [true, "Please provide a number!"],
        min: [0, "No Opennings Left!"],
      },
    },
  ],
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
