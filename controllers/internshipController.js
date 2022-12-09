const Internship = require("../models/internshipModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createInternship = catchAsync(async (req, res, next) => {
  const { type, details } = req.body;
  const internship = await Internship.create({
    type,
    details,
  });
  res.status(201).json({
    internship,
  });
});

exports.getAllInternships = catchAsync(async (req, res, next) => {
  const internships = await Internship.find({});
  res.status(200).json({
    count: internships.length,
    internships,
  });
});
